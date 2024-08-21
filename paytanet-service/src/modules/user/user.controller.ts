import { Get, Controller, Patch, Body } from '@nestjs/common';

import { GetJwtUser } from '@/shared/decorators/jwt.decorator';

import { UserService } from '@/modules/user/user.service';

import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';

import { JwtUserInfo } from '@/interfaces/auth.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/my/information')
  async getMyInformation(@GetJwtUser() jwtUserInfo: JwtUserInfo) {
    return await this.userService.getMyInformation(jwtUserInfo);
  }

  @Patch('/update/my/information')
  async updateUser(
    @GetJwtUser() jwtUserInfo: JwtUserInfo,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateMyInformation(
      jwtUserInfo,
      updateUserDto,
    );
  }
}
