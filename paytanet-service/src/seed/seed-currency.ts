import { DataSource, DeepPartial } from 'typeorm';

import { Currency } from '@/models/currency/entities/currency.entity';

export const seedCurrency = async (typeOrmDataSource: DataSource) => {
  const currencyRepository = typeOrmDataSource.getRepository(Currency.name);

  const currencies: DeepPartial<Currency[]> = [
    {
      currencyName: 'Thai Baht',
      currencyCode: 'THB',
      currencySymbol: '฿',
      flagImage: 'https://www.worldatlas.com/img/flag/th-flag.jpg',
      isDefault: true,
    },
    {
      currencyName: 'USA : DOLLAR (USD)',
      currencyCode: 'USD',
      currencySymbol: '$',
      flagImage: 'https://www.bot.or.th/content/dam/bot/currencyflags/USD.png',
      isDefault: false,
    },
    {
      currencyName: 'EURO ZONE : EURO (EUR)',
      currencyCode: 'EUR',
      currencySymbol: '€',
      flagImage: 'https://www.bot.or.th/content/dam/bot/currencyflags/EUR.png',
      isDefault: false,
    },
  ];

  const foundCurrencies = (await currencyRepository.find()) as Currency[];

  const existingCurrency = foundCurrencies.map((c) => c.currencyCode);

  const newCurrency = currencies.filter(
    (c) => !existingCurrency.includes(c.currencyCode),
  );

  if (newCurrency.length > 0) {
    for (const currency of newCurrency) {
      const currencyEntity = currencyRepository.create(currency);
      await currencyRepository.save(currencyEntity);
    }
  }

  console.log('Currency seed completed');
};
