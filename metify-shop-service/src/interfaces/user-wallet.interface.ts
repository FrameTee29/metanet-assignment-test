import { Currency } from '@/interfaces/currency.interface';

export interface UserWallet {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  balance: string;
  currency: Currency;
}
