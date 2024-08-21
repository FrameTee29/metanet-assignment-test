import { Cron } from '@nestjs/schedule';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { CurrencyCacheKey } from '@/constants/cache/currency.constant';
import { ExchangeRateCacheKey } from '@/constants/cache/exchange-rate.constant';

import { CachingService } from '@/shared/caching/caching.service';
import { BankOfThailandGateway } from '@/shared/gateways/bank-of-thailand/bank-of-thailand.gateway';

import { CurrencyRepository } from '@/models/currency/repositories/currency.repository';

@Injectable()
export class CurrencyService implements OnModuleInit {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(
    private readonly cachingService: CachingService,
    private readonly bankOfThailandGateway: BankOfThailandGateway,
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  onModuleInit() {
    this.getExchangeRateToday();
    this.getAllCurrenciesToday();
  }

  @Cron('0 */6 * * *')
  async getExchangeRateToday() {
    const response = await this.bankOfThailandGateway.getExchangeRateToday();

    const currencyRate = response.responseContent;

    const cacheKey = ExchangeRateCacheKey.EXCHANGE_RATE;
    const ttl = 60 * 60 * 24; // 1 day
    await this.cachingService.set(cacheKey, currencyRate, ttl);

    this.logger.debug('Exchange rate today has been updated');

    return currencyRate;
  }

  @Cron('0 */6 * * *')
  async getAllCurrenciesToday() {
    const currencies = await this.currencyRepository.find();

    const cacheKey = CurrencyCacheKey.CURRENCY_SUPPORTED;
    await this.cachingService.set(cacheKey, currencies, 0);

    this.logger.debug('All currencies have been updated');

    return currencies;
  }

  async getExchangeRate() {
    const cacheKey = ExchangeRateCacheKey.EXCHANGE_RATE;
    const exchangeRate = await this.cachingService.get(cacheKey);

    if (!exchangeRate) {
      return await this.getExchangeRateToday();
    }

    return exchangeRate;
  }

  async getAllCurrencies() {
    const cacheKey = CurrencyCacheKey.CURRENCY_SUPPORTED;
    const currencies = await this.cachingService.get(cacheKey);

    return currencies;
  }
}
