import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { Order } from '@/models/order/entities/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor() {
    super(Order, TypeOrmDataSource.createEntityManager());
  }

  async saveWithTxManager(order: Order, txManager: EntityManager) {
    if (txManager) {
      return await txManager.save(order);
    }
    return await this.save(order);
  }
}
