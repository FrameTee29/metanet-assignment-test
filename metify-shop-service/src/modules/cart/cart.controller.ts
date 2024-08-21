import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { GetJwtUser } from '@/shared/decorators/jwt.decorator';

import { CartService } from '@/modules/cart/cart.service';

import { JwtUserInfo } from '@/interfaces/auth.interface';

import { AddProductToCartDto } from '@/modules/cart/dto/add-product-to-cart.dto';
import { EditProductToCartDto } from '@/modules/cart/dto/edit-product-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/my/products')
  getMyCartProducts(@GetJwtUser() jwtUserInfo: JwtUserInfo) {
    return this.cartService.getMyCartProducts(jwtUserInfo);
  }

  @Post('/add/product')
  addProductToCart(
    @GetJwtUser() jwtUserInfo: JwtUserInfo,
    @Body() addProductToCartDto: AddProductToCartDto,
  ) {
    return this.cartService.addProductToCart(jwtUserInfo, addProductToCartDto);
  }

  @Patch('/edit/product')
  editProductInCart(@Body() editProductToCartDto: EditProductToCartDto) {
    return this.cartService.editProductInCart(editProductToCartDto);
  }

  @Delete('/remove/product/:cartItemId')
  removeProductFromCart(@Param('cartItemId') cartItemId: string) {
    return this.cartService.removeProductFromCart(cartItemId);
  }
}
