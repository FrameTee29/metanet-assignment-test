import { IsNotEmpty } from 'class-validator';

export class RemoveProductToCartDto {
  @IsNotEmpty()
  cartItemId: string;
}
