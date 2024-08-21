import { Injectable } from '@nestjs/common';

import { PaytanetGateway } from '@/shared/gateways/paytanet/paytanet.gateway';

import { LoginDto } from '@/modules/auth/dto/login.dto';
import { CachingService } from '@/shared/caching/caching.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cachingService: CachingService,
    private readonly paytanetGateway: PaytanetGateway,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const result = await this.paytanetGateway.login(loginDto);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
