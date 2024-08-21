import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import * as compression from 'compression';

import { AppModule } from '@/app.module';

import { HttpsExceptionFilter } from '@/shared/exceptions/http-exception.filter';

import { AppConfig, Config } from '@/interfaces/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * Config
  const configService = app.get(ConfigService) as ConfigService<Config>;

  const appConfig = configService.get<AppConfig>('app');

  // * Cors
  app.enableCors();

  // * Global Prefix
  app.setGlobalPrefix('api');

  // * Compression
  app.use(compression());

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // * Validators
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      enableDebugMessages: true,
    }),
  );

  // * Exception filter
  app.useGlobalFilters(new HttpsExceptionFilter());

  await app.listen(appConfig.port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
