import { Injectable, NotFoundException } from '@nestjs/common';

import { CachingService } from '@/shared/caching/caching.service';

import { User } from '@/models/user/entities/user.entity';

import { UserRepository } from '@/models/user/repositories/user.repository';

import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';

import { JwtUserInfo } from '@/interfaces/auth.interface';
import { UserCacheKey } from '@/constants/cache/user.constant';

@Injectable()
export class UserService {
  constructor(
    private readonly cachingService: CachingService,
    private readonly userRepository: UserRepository,
  ) {}

  async getMyInformation(jwtUserInfo: JwtUserInfo): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { id: jwtUserInfo.id },
      relations: ['userWallets', 'userWallets.currency', 'userAuth'],
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const cacheKey = `${UserCacheKey.USER_INFORMATION}:${jwtUserInfo.id}`;
    await this.cachingService.set(cacheKey, foundUser, 0);

    return foundUser;
  }

  async updateMyInformation(
    jwtUserInfo: JwtUserInfo,
    UpdateUserDto: UpdateUserDto,
  ) {
    const { id } = jwtUserInfo;

    const foundUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.save({ ...foundUser, ...UpdateUserDto });
  }
}
