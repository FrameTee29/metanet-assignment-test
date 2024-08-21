import { IsNotEmpty, IsOptional } from 'class-validator';

export class WithdrawDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currencyCode: string;

  @IsOptional()
  note: string;
}
