import { IsNotEmpty } from 'class-validator';

export class PayDto {
  @IsNotEmpty()
  currencyCode: string;

  @IsNotEmpty()
  priceRate: number;

  @IsNotEmpty()
  totalPrice: number;
}
