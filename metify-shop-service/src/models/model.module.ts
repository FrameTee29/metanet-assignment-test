import { Module } from '@nestjs/common';

import { CartModelModule } from '@/models/cart/cart-model.module';
import { OrderModelModule } from '@/models/order/order-model.module';
import { ProductModelModule } from '@/models/product/product-model.module';

@Module({
  imports: [ProductModelModule, OrderModelModule, CartModelModule],
})
export class ModelModule {}
