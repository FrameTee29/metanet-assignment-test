import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Withdraw } from '@/models/withdraw/entities/withdraw.entity';
import { WithdrawRepository } from '@/models/withdraw/repositories/withdraw.repository';

const repositories = [WithdrawRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Withdraw])],
  providers: [...repositories],
  exports: [...repositories],
})
export class WithdrawModelModule {}
