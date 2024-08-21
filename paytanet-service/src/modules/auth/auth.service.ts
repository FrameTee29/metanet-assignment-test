import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';

import configuration from '@/config/configuration';
// import { AuthCacheKey } from '@/constants/cache/auth.constant';

import { UserRepository } from '@/models/user/repositories/user.repository';
import { UserAuthRepository } from '@/models/user/repositories/user-auth.repository';
import { CurrencyRepository } from '@/models/currency/repositories/currency.repository';
import { UserWalletRepository } from '@/models/user/repositories/user-wallet.repository';

// import { CachingService } from '@/shared/caching/caching.service';

import { LoginDto } from '@/modules/auth/dto/login.dto';
import { RegisterDto } from '@/modules/auth/dto/register.dto';

import { SignUserPayload } from '@/interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly entityManage: EntityManager,
    // private readonly cachingService: CachingService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly userAuthRepository: UserAuthRepository,
    private readonly userWalletRepository: UserWalletRepository,
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const { username } = registerDto;

      const foundUser =
        await this.userAuthRepository.findOneByUsername(username);

      if (foundUser) {
        throw new BadRequestException('Username already exists');
      }

      const currencies = await this.currencyRepository.find();

      if (currencies.length === 0) {
        throw new BadRequestException('Please add currency first');
      }

      const pepper = configuration().security.pepper;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(
        registerDto.password,
        salt + pepper,
      );

      const txResult = await this.entityManage.transaction(
        async (txManager) => {
          const userData = await this.userRepository.create({
            ...registerDto,
            isActive: true,
          });

          const userResult = await this.userRepository.saveWithTxManager(
            userData,
            txManager,
          );

          const userAuthData = await this.userAuthRepository.create({
            username: registerDto.username,
            password: hashPassword,
            salt,
            user: userResult,
          });

          const userAuthResult =
            await this.userAuthRepository.saveWithTxManager(
              userAuthData,
              txManager,
            );

          const userWallets = [];

          for (const currency of currencies) {
            const userWalletData = await this.userWalletRepository.create({
              user: userResult,
              currency,
            });
            const result = await this.userWalletRepository.saveWithTxManager(
              userWalletData,
              txManager,
            );

            userWallets.push(result);
          }

          return { userAuthResult, userResult, userWallets };
        },
      );

      return { message: 'User registered successfully', data: txResult };
    } catch (error: any) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const foundUser = await this.userRepository.findOneByUsername(username);

    if (!foundUser) {
      throw new BadRequestException('username is not found');
    }

    const isMatch = await bcrypt.compare(password, foundUser.userAuth.password);

    if (!isMatch) {
      throw new BadRequestException('Password is incorrect');
    }

    const payloadForSign: SignUserPayload = {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      phone: foundUser.phone,
      userAuth: {
        username: foundUser.userAuth.username,
      },
    };

    const { secret, expiresIn } = configuration().jwt;

    const accessToken = await this.jwtService.signAsync(payloadForSign, {
      secret,
      expiresIn,
    });

    // const cacheAccessToken = {
    //   accessToken,
    // };

    // const cacheKey = `${AuthCacheKey.AUTH_ACCESS_TOKEN}:${foundUser.userAuth.username}`;
    // const ttl = 60 * 60 * 24; // 1 day = 60 * 60 * 24;
    // await this.cachingService.set(cacheKey, cacheAccessToken, ttl);

    return { accessToken };
  }
}
