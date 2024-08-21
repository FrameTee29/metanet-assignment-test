import { Module } from '@nestjs/common';

import { CartController } from '@/modules/cart/cart.controller';

import { CartService } from '@/modules/cart/cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
