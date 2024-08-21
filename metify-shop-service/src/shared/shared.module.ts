import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { DatabaseModule } from '@/shared/database/database.module';

import { PaytanetGateway } from '@/shared/gateways/paytanet/paytanet.gateway';
import { CachingModule } from './caching/caching.module';

@Global()
@Module({
  imports: [HttpModule, DatabaseModule, CachingModule],
  providers: [PaytanetGateway],
  exports: [PaytanetGateway],
})
export class SharedModule {}
