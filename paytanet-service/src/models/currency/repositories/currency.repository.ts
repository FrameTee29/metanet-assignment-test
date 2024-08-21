import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { Currency } from '@/models/currency/entities/currency.entity';

@Injectable()
export class CurrencyRepository extends Repository<Currency> {
  constructor() {
    super(Currency, TypeOrmDataSource.createEntityManager());
  }

  async findOneByCode(code: string): Promise<Currency> {
    return await this.findOne({ where: { currencyCode: code } });
  }
}
