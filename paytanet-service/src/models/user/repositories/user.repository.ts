import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { User } from '@/models/user/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor() {
    super(User, TypeOrmDataSource.createEntityManager());
  }

  async saveWithTxManager(
    entity: User,
    txManager?: EntityManager,
  ): Promise<User> {
    if (txManager) {
      return await txManager.save(entity);
    }

    return await this.save(entity);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.findOne({
      where: { userAuth: { username } },
      relations: ['userAuth'],
    });
  }

  async findOneById(id: string): Promise<User> {
    return await this.findOne({
      where: { id },
      relations: ['userAuth', 'userWallets', 'userWallets.currency'],
    });
  }
}
