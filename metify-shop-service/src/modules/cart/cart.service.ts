import { BadRequestException, Injectable } from '@nestjs/common';

import { Cart } from '@/models/cart/entities/cart.entity';

import { CartRepository } from '@/models/cart/repositories/cart.repository';
import { CartItemsRepository } from '@/models/cart/repositories/cart-items.repository';

import { JwtUserInfo } from '@/interfaces/auth.interface';

import { AddProductToCartDto } from '@/modules/cart/dto/add-product-to-cart.dto';
import { EditProductToCartDto } from '@/modules/cart/dto/edit-product-to-cart.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectEntityManager()
    private readonly entityManage: EntityManager,
    private readonly cartRepository: CartRepository,
    private readonly cartItemsRepository: CartItemsRepository,
  ) {}

  async getMyCartProducts(jwtUserInfo: JwtUserInfo) {
    const { id: userId } = jwtUserInfo;

    const foundCart = await this.cartRepository.findOneByUserId(userId);

    return foundCart;
  }

  async addProductToCart(
    jwtUserInfo: JwtUserInfo,
    addProductToCartDto: AddProductToCartDto,
  ) {
    const { id: userId } = jwtUserInfo;
    const { productId, quantity } = addProductToCartDto;

    const foundCart = await this.cartRepository.findOneByUserId(userId);

    let myCart: Cart = foundCart;

    await this.entityManage.transaction(async (txManager) => {
      if (!foundCart) {
        const mewCart = this.cartRepository.create({ userId });

        myCart = await this.cartRepository.saveWithTxManager(
          mewCart,
          txManager,
        );
      }

      const existingCartItem = await foundCart.cartItems.find(
        (cartItem) => cartItem.product.id === productId,
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        return await this.cartItemsRepository.saveWithTxManager(
          existingCartItem,
          txManager,
        );
      }

      const newItemInCart = this.cartItemsRepository.create({
        cart: myCart,
        product: { id: productId },
        quantity,
      });

      await this.cartItemsRepository.saveWithTxManager(
        newItemInCart,
        txManager,
      );
    });

    return { message: 'Product added to cart' };
  }

  async editProductInCart(editProductToCartDto: EditProductToCartDto) {
    const { cartItemId, quantity } = editProductToCartDto;

    const foundCartItem = await this.cartItemsRepository.findOne({
      where: { id: cartItemId },
    });

    if (!foundCartItem) {
      throw new BadRequestException('Cart item not found');
    }

    foundCartItem.quantity = quantity;

    return await this.cartItemsRepository.save(foundCartItem);
  }

  async removeProductFromCart(cartItemId: string) {
    const result = await this.cartItemsRepository.delete({
      id: cartItemId,
    });

    if (result.affected === 0) {
      throw new Error('Cart item not found');
    }

    return { message: 'Cart item removed' };
  }
}
