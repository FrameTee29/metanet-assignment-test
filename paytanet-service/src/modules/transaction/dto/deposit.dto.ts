import { IsNotEmpty, IsOptional } from 'class-validator';

export class DepositDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currencyCode: string;

  @IsOptional()
  note: string;
}
