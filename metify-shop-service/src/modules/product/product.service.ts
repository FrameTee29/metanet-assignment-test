import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@/models/product/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts() {
    return await this.productRepository.find();
  }
}
