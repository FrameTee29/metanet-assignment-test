import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { OrderItems } from '@/models/order/entities/order-items.entity';

@Injectable()
export class OrderItemsRepository extends Repository<OrderItems> {
  constructor() {
    super(OrderItems, TypeOrmDataSource.createEntityManager());
  }

  async saveWithTxManager(orderItems: OrderItems, txManager: EntityManager) {
    if (txManager) {
      return await txManager.save(orderItems);
    }
    return await this.save(orderItems);
  }
}
