import { Controller, Get } from '@nestjs/common';

import { CurrencyService } from '@/modules/currency/currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/exchange-rate')
  getExchangeRate() {
    return this.currencyService.getExchangeRate();
  }

  @Get('/all')
  getAllCurrencies() {
    return this.currencyService.getAllCurrencies();
  }
}
