import { Controller, Get } from '@nestjs/common';

import { UserService } from '@/modules/user/user.service';
import { GetJwtToken, GetJwtUser } from '@/shared/decorators/jwt.decorator';

import { JwtUserInfo } from '@/interfaces/auth.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/my/wallets')
  async getMyWallets(
    @GetJwtToken() accessToken: string,
    @GetJwtUser() jwtUserInfo: JwtUserInfo,
  ) {
    return this.userService.getMyWallets(accessToken, jwtUserInfo);
  }
}
