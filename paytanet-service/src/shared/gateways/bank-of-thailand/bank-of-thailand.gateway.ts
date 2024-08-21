import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

import { ErrorHandler } from '@/utils/error.util';

import { BankOfThailandConfig } from '@/interfaces/config.interface';
import { ExchangeRateTodayResponse } from '@/interfaces/bank-of-thailand.interface';

@Injectable()
export class BankOfThailandGateway {
  private readonly logger = new Logger(BankOfThailandGateway.name);

  private baseUrl: string;
  private exchangeRateTodayPath =
    '/content/bot/th/statistics/exchange-rate/jcr:content/root/container/statisticstable2.results.level3cache.json';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    const { url } = this.configService.get<BankOfThailandConfig>('BOT');
    this.baseUrl = url;
  }

  async getExchangeRateToday() {
    try {
      const response = this.httpService.get<ExchangeRateTodayResponse>(
        this.baseUrl + this.exchangeRateTodayPath,
      );

      const { data } = await lastValueFrom(response);

      return data;
    } catch (error) {
      this.logger.error(`[getExchangeRateToday] - Error`, error);
      ErrorHandler(error);
    }
  }
}
