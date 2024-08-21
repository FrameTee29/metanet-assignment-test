import { Injectable } from '@nestjs/common';

import { OrderRepository } from '@/models/order/repositories/order.repository';

import { JwtUserInfo } from '@/interfaces/auth.interface';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrderHistory(jwtUserInfo: JwtUserInfo) {
    return await this.orderRepository.find({
      where: {
        userId: jwtUserInfo.id,
      },
      relations: ['orderItems', 'orderItems.product'],
    });
  }
}
