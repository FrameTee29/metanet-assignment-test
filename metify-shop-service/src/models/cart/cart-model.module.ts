import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cart } from '@/models/cart/entities/cart.entity';
import { CartItems } from '@/models/cart/entities/cart-items.entity';

import { CartRepository } from '@/models/cart/repositories/cart.repository';
import { CartItemsRepository } from '@/models/cart/repositories/cart-items.repository';

const repositories = [CartRepository, CartItemsRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItems])],
  providers: [...repositories],
  exports: [...repositories],
})
export class CartModelModule {}
