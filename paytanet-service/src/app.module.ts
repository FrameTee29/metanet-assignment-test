import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { getConfigModuleOptions } from '@/config/config';

import { SharedModule } from '@/shared/shared.module';
import { AuthMiddleware } from '@/shared/middleware/auth.middleware';
import { ResponseFormatInterceptor } from '@/shared/interceptors/response-format.interceptor';

import { ModelModule } from '@/models/model.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { CurrencyModule } from '@/modules/currency/currency.module';
import { TransactionModule } from '@/modules/transaction/transaction.module';
import { UserWalletModule } from '@/modules/user-wallet/user-wallet.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(getConfigModuleOptions()),
    SharedModule,
    ModelModule,
    AuthModule,
    UserModule,
    CurrencyModule,
    TransactionModule,
    UserWalletModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseFormatInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/health', method: RequestMethod.GET },
        { path: '/auth/register', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
