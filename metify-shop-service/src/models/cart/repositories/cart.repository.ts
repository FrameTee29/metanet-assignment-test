import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { Cart } from '@/models/cart/entities/cart.entity';

@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor() {
    super(Cart, TypeOrmDataSource.createEntityManager());
  }

  async saveWithTxManager(cart: Cart, txManager: EntityManager) {
    if (txManager) {
      return await txManager.save(cart);
    }
    return await this.save(cart);
  }

  async findOneByUserId(userId: string): Promise<Cart> {
    return await this.findOne({
      where: { userId },
      relations: ['cartItems', 'cartItems.product'],
    });
  }

  async findAllByUserId(userId: string): Promise<Cart[]> {
    return await this.find({ where: { userId }, relations: ['cartItems'] });
  }

  async removeWithTxManager(cart: Cart, txManager: EntityManager) {
    if (txManager) {
      return await txManager.remove(cart);
    }
    return await this.remove(cart);
  }
}
