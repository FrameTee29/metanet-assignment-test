import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { Withdraw } from '@/models/withdraw/entities/withdraw.entity';

@Injectable()
export class WithdrawRepository extends Repository<Withdraw> {
  constructor() {
    super(Withdraw, TypeOrmDataSource.createEntityManager());
  }

  async saveWithTxManager(
    data: Withdraw,
    txManager?: EntityManager,
  ): Promise<Withdraw> {
    if (txManager) {
      return await txManager.save(data);
    }

    return await this.save(data);
  }
}
