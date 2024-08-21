import { IsNotEmpty } from 'class-validator';

export class EditProductToCartDto {
  @IsNotEmpty()
  cartItemId: string;

  @IsNotEmpty()
  quantity: number;
}
