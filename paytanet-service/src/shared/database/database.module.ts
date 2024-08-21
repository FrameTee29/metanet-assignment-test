import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmDataSource.options)],
})
export class DatabaseModule {}
