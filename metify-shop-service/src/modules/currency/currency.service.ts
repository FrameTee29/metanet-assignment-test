import { Injectable } from '@nestjs/common';

import { CurrencyCacheKey } from '@/constants/cache/currency.constant';
import { ExchangeRateCacheKey } from '@/constants/cache/exchange-rate.constant';

import { CachingService } from '@/shared/caching/caching.service';

import { ResponseContentRate } from '@/interfaces/bank-of-thailand.interface';

@Injectable()
export class CurrencyService {
  constructor(private readonly cachingService: CachingService) {}

  async getExchangeRate() {
    const exchangeRate = await this.cachingService.get(
      ExchangeRateCacheKey.EXCHANGE_RATE,
    );

    return exchangeRate || [];
  }

  async getAllCurrencies() {
    const currencies = await this.cachingService.get(
      CurrencyCacheKey.CURRENCY_SUPPORTED,
    );

    return currencies || [];
  }

  async getExchangeReteByCurrencyCode(
    currencyCode: string,
  ): Promise<ResponseContentRate> {
    const exchangeRate = (await this.cachingService.get(
      ExchangeRateCacheKey.EXCHANGE_RATE,
    )) as ResponseContentRate[];

    return exchangeRate.find((rate) => rate.currency_id === currencyCode);
  }
}
