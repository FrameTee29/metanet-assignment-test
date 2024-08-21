import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { getConfigModuleOptions } from '@/config/config';

import { SharedModule } from '@/shared/shared.module';
import { AuthMiddleware } from '@/shared/middleware/auth.middleware';
import { ResponseFormatInterceptor } from '@/shared/interceptors/response-format.interceptor';

import { ModelModule } from '@/models/model.module';

import { AuthModule } from '@/modules/auth/auth.module';
import { CartModule } from '@/modules/cart/cart.module';
import { OrderModule } from '@/modules/order/order.module';
import { ProductModule } from '@/modules/product/product.module';
import { PaymentModule } from './modules/payment/payment.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    ModelModule,
    SharedModule,
    AuthModule,
    ProductModule,
    CartModule,
    OrderModule,
    PaymentModule,
    CurrencyModule,
    UserModule,
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
      .exclude({ path: '/auth/login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
