import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
