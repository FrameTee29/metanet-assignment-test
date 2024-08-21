export interface Currency {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  currencyName: string;
  currencyCode: string;
  currencySymbol: string;
  flagImage: string;
  isDefault: boolean;
}
