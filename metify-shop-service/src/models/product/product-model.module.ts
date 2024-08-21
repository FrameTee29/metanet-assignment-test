import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@/models/product/entities/product.entity';
import { ProductRepository } from '@/models/product/repositories/product.repository';

const repositories = [ProductRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [...repositories],
  exports: [...repositories],
})
export class ProductModelModule {}
