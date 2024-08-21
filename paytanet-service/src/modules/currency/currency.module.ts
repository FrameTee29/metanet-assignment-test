import { Module } from '@nestjs/common';

import { CurrencyController } from '@/modules/currency/currency.controller';

import { CurrencyService } from '@/modules/currency/currency.service';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
