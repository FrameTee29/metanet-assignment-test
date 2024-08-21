import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { UserAddress } from '@/models/user/entities/user-address.entity';

@Injectable()
export class UserAddressRepository extends Repository<UserAddress> {
  constructor() {
    super(UserAddress, TypeOrmDataSource.createEntityManager());
  }
}
