import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/models/user/entities/user.entity';
import { UserAuth } from '@/models/user/entities/user-auth.entity';
import { UserWallet } from '@/models/user/entities/user-wallet.entity';
import { UserAddress } from '@/models/user/entities/user-address.entity';

import { UserRepository } from '@/models/user/repositories/user.repository';
import { UserAuthRepository } from '@/models/user/repositories/user-auth.repository';
import { UserWalletRepository } from '@/models/user/repositories/user-wallet.repository';
import { UserAddressRepository } from '@/models/user/repositories/user-address.repository';

const repositories = [
  UserRepository,
  UserAuthRepository,
  UserWalletRepository,
  UserAddressRepository,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserWallet, UserAuth, UserAddress]),
  ],
  providers: [...repositories],
  exports: [...repositories],
})
export class UserModelModule {}
