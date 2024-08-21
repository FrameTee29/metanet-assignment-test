export interface ExchangeRateTodayResponse {
  tab1Heading: string;
  tab2Heading: string;
  lastUpdated: string;
  responseContent: ResponseContentRate[];
  futureDateErrorMessage: string;
  futureDateFlag: boolean;
  noDataFoundMessage: string;
  noDataFoundFlag: boolean;
  currentDateFlg: boolean;
  exportFileName: string;
  description: string;
  date: string;
  ':type': string;
}

export interface ResponseContentRate {
  period: string;
  currency_id: string;
  countryName: string;
  currency_name_th: string;
  currency_name_eng: string;
  buying_sight: string;
  buying_transfer: string;
  selling: string;
  flagPath: string;
  sortOrder: number;
}
