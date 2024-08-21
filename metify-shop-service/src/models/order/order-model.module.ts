import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '@/models/order/entities/order.entity';
import { OrderItems } from '@/models/order/entities/order-items.entity';

import { OrderRepository } from '@/models/order/repositories/order.repository';
import { OrderItemsRepository } from '@/models/order/repositories/order-items.repository';

const repositories = [OrderRepository, OrderItemsRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItems])],
  providers: [...repositories],
  exports: [...repositories],
})
export class OrderModelModule {}
