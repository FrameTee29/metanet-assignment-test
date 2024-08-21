import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { Deposit } from '@/models/deposit/entities/deposit.entity';

@Injectable()
export class DepositRepository extends Repository<Deposit> {
  constructor() {
    super(Deposit, TypeOrmDataSource.createEntityManager());
  }

  async saveWithTxManager(
    data: Deposit,
    txManager?: EntityManager,
  ): Promise<Deposit> {
    if (txManager) {
      return await txManager.save(data);
    }

    return await this.save(data);
  }
}
