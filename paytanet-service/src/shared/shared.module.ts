import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { CachingModule } from '@/shared/caching/caching.module';
import { DatabaseModule } from '@/shared/database/database.module';
import { BankOfThailandGateway } from '@/shared/gateways/bank-of-thailand/bank-of-thailand.gateway';

@Global()
@Module({
  imports: [HttpModule, DatabaseModule, CachingModule],
  providers: [BankOfThailandGateway],
  exports: [BankOfThailandGateway],
})
export class SharedModule {}
