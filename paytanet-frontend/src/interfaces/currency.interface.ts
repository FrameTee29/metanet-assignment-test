import type { BaseInterface } from '@/interfaces/base.interface'

export interface Currency extends BaseInterface {
  currencyName: string
  currencyCode: string
  currencySymbol: string
  flagImage: string
  isDefault: boolean
}
