import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Deposit } from '@/models/deposit/entities/deposit.entity';
import { DepositRepository } from '@/models/deposit/repositories/deposit.repository';

const repositories = [DepositRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Deposit])],
  providers: [...repositories],
  exports: [...repositories],
})
export class DepositModelModule {}
