import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { CartItems } from '@/models/cart/entities/cart-items.entity';

@Injectable()
export class CartItemsRepository extends Repository<CartItems> {
  constructor() {
    super(CartItems, TypeOrmDataSource.createEntityManager());
  }

  async saveWithTxManager(cartItems: CartItems, txManager: EntityManager) {
    if (txManager) {
      return await txManager.save(cartItems);
    }
    return await this.save(cartItems);
  }

  async removeWithTxManager(cartItems: CartItems[], txManager: EntityManager) {
    if (txManager) {
      return await txManager.remove(cartItems);
    }
    return await this.remove(cartItems);
  }
}
