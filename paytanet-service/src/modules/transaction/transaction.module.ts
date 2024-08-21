import { Module } from '@nestjs/common';

import { TransactionController } from '@/modules/transaction/transaction.controller';

import { TransactionService } from '@/modules/transaction/transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
