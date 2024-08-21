import { Controller, Get } from '@nestjs/common';

import { GetJwtUser } from '@/shared/decorators/jwt.decorator';

import { OrderService } from '@/modules/order/order.service';

import { JwtUserInfo } from '@/interfaces/auth.interface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/history')
  async getOrderHistory(@GetJwtUser() jwtUserInfo: JwtUserInfo) {
    return this.orderService.getOrderHistory(jwtUserInfo);
  }
}
