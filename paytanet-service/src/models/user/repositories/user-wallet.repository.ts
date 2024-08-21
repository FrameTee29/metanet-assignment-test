import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { UserWallet } from '@/models/user/entities/user-wallet.entity';

@Injectable()
export class UserWalletRepository extends Repository<UserWallet> {
  constructor() {
    super(UserWallet, TypeOrmDataSource.createEntityManager());
  }

  async saveWithTxManager(
    data: UserWallet,
    txManager?: EntityManager,
  ): Promise<UserWallet> {
    if (txManager) {
      return await txManager.save(data);
    }

    return await this.save(data);
  }

  async findOneByUserId(userId: string): Promise<UserWallet[]> {
    return await this.find({
      where: { user: { id: userId } },
      relations: ['currency'],
    });
  }
}
