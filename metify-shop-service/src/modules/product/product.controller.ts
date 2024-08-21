import { Controller, Get } from '@nestjs/common';

import { ProductService } from '@/modules/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  getAllProducts() {
    return this.productService.getAllProducts();
  }
}
