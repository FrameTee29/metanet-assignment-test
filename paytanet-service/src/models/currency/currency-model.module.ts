import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Currency } from '@/models/currency/entities/currency.entity';
import { CurrencyRepository } from '@/models/currency/repositories/currency.repository';

const repositories = [CurrencyRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  providers: [...repositories],
  exports: [...repositories],
})
export class CurrencyModelModule {}
