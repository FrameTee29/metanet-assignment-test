import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { Product } from '@/models/product/entities/product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor() {
    super(Product, TypeOrmDataSource.createEntityManager());
  }
}
