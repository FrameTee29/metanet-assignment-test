import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { UserAuth } from '@/models/user/entities/user-auth.entity';

@Injectable()
export class UserAuthRepository extends Repository<UserAuth> {
  constructor() {
    super(UserAuth, TypeOrmDataSource.createEntityManager());
  }

  async findOneByUsername(username: string): Promise<UserAuth> {
    return this.findOne({ where: { username } });
  }

  async saveWithTxManager(
    entity: UserAuth,
    txManager?: EntityManager,
  ): Promise<UserAuth> {
    if (txManager) {
      return await txManager.save(entity);
    }

    return await this.save(entity);
  }
}
