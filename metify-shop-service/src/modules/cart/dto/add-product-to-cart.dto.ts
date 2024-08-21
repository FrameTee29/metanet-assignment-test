import { IsNotEmpty } from 'class-validator';

export class AddProductToCartDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  quantity: number;
}
