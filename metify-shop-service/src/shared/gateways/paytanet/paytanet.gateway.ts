import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ErrorHandler } from '@/utils/error.util';

import { Response } from '@/interfaces/response.interface';
import { PaytanetConfig } from '@/interfaces/config.interface';
import {
  LoginPayload,
  LoginResponse,
  WithdrawPayload,
  WithdrawResponse,
} from '@/interfaces/paytanet.interface';
import { UserWallet } from '@/interfaces/user-wallet.interface';

@Injectable()
export class PaytanetGateway {
  private baseUrl: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    const { url } = this.configService.get<PaytanetConfig>('paytanet');
    this.baseUrl = url;
  }

  setAccessToken(accessToken: string) {
    this.httpService.axiosRef.defaults.headers['Authorization'] = accessToken;
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = this.httpService.post<Response<LoginResponse>>(
        `${this.baseUrl}/auth/login`,
        payload,
      );

      const { data } = await lastValueFrom(response);

      return data.data;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async withdraw(payload: WithdrawPayload): Promise<WithdrawResponse> {
    try {
      const response = this.httpService.post<Response<WithdrawResponse>>(
        `${this.baseUrl}/transaction/withdraw`,
        payload,
      );

      const { data } = await lastValueFrom(response);

      return data.data;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async getMyWallets(): Promise<UserWallet[]> {
    try {
      const response = this.httpService.get<Response<UserWallet[]>>(
        `${this.baseUrl}/user-wallet/my/wallet`,
      );

      const { data } = await lastValueFrom(response);

      return data.data;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
