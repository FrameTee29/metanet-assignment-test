import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';
import { Order } from './order.entity';
import { Product } from '@/models/product/entities/product.entity';

@Entity('order_items')
export class OrderItems extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'quantity', default: 0 })
  quantity: number;

  @Column({
    name: 'price_at_time',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: false,
    default: 1,
  })
  priceAtTime: number;

  @Column({ name: 'currency_code', nullable: false, default: 'THB' })
  currencyCode: string;
}
