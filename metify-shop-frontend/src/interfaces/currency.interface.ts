import type { BaseInterface } from '@/interfaces/base.interface'

export interface Currency extends BaseInterface {
  currencyName: string
  currencyCode: string
  currencySymbol: string
  flagImage: string
  isDefault: boolean
}

export interface ExchangeRate {
  period: string
  currency_id: string
  countryName: string
  currency_name_th: string
  currency_name_eng: string
  buying_sight: string
  buying_transfer: string
  selling: string
  flagPath: string
  sortOrder: number
}
