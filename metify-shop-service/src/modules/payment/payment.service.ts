import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import { PaytanetGateway } from '@/shared/gateways/paytanet/paytanet.gateway';

import { Cart } from '@/models/cart/entities/cart.entity';
import { OrderItems } from '@/models/order/entities/order-items.entity';

import { CartRepository } from '@/models/cart/repositories/cart.repository';
import { OrderRepository } from '@/models/order/repositories/order.repository';
import { CartItemsRepository } from '@/models/cart/repositories/cart-items.repository';
import { OrderItemsRepository } from '@/models/order/repositories/order-items.repository';

import { CurrencyService } from '@/modules/currency/currency.service';

import { PayDto } from '@/modules/payment/dto/pay.dto';

import { JwtUserInfo } from '@/interfaces/auth.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectEntityManager()
    private readonly entityManage: EntityManager,
    private readonly paytanetGateway: PaytanetGateway,
    private readonly cartRepository: CartRepository,
    private readonly cartItemsRepository: CartItemsRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly currencyService: CurrencyService,
  ) {}

  async pay(accessToken: string, jwtUserInfo: JwtUserInfo, payDto: PayDto) {
    try {
      const { id: userId } = jwtUserInfo;

      const foundCart = await this.cartRepository.findOneByUserId(userId);

      const { totalPrice, priceRate, orderItems } =
        await this.calculatePriceEachCartItems(foundCart, payDto.currencyCode);

      this.paytanetGateway.setAccessToken(accessToken);
      await this.paytanetGateway.withdraw({
        amount: Number(totalPrice.toFixed(2)),
        currencyCode: payDto.currencyCode,
        note: 'Payment for order (Metify Shop)',
      });

      await this.entityManage.transaction(async (txManager) => {
        const orderData = this.orderRepository.create({
          userId,
          totalPrice: Number(totalPrice.toFixed(2)),
          priceRate: Number(priceRate.toFixed(2)),
          currencyCode: payDto.currencyCode,
        });

        const orderResult = await this.orderRepository.saveWithTxManager(
          orderData,
          txManager,
        );

        for (const orderItem of orderItems) {
          const orderItemData = this.orderItemsRepository.create({
            ...orderItem,
            order: { id: orderResult.id },
          });

          await this.orderItemsRepository.saveWithTxManager(
            orderItemData,
            txManager,
          );
        }

        await this.cartItemsRepository.removeWithTxManager(
          foundCart.cartItems,
          txManager,
        );
        await this.cartRepository.removeWithTxManager(foundCart, txManager);
      });

      return { message: 'Payment success' };
    } catch (error) {
      throw error;
    }
  }

  private async calculatePriceEachCartItems(cart: Cart, currencyCode: string) {
    const priceRate = await this.convertPrice(currencyCode);
    let totalPrice = 0;
    const orderItems: OrderItems[] = [];

    for (const cartItem of cart.cartItems) {
      const priceAtTime = Number(cartItem.product.price) / Number(priceRate);
      totalPrice += priceAtTime;
      const orderItemData = this.orderItemsRepository.create({
        product: {
          id: cartItem.product.id,
        },
        quantity: cartItem.quantity,
        priceAtTime: Number(priceAtTime.toFixed(2)),
        currencyCode: currencyCode,
      });

      orderItems.push(orderItemData);
    }

    return { totalPrice, priceRate, orderItems };
  }

  private async convertPrice(currencyCode: string): Promise<number> {
    if (currencyCode !== 'THB') {
      const currencyRate =
        await this.currencyService.getExchangeReteByCurrencyCode(currencyCode);
      return +Number(currencyRate.selling).toFixed(2);
    }

    return 1;
  }
}
