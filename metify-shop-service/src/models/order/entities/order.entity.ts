import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';

import { OrderItems } from '@/models/order/entities/order-items.entity';

@Entity('order')
export class Order extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: false,
    default: 0,
  })
  totalPrice: number;

  @Column({
    name: 'price_rate',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: false,
    default: 1,
  })
  priceRate: number;

  @Column({ name: 'currency_code', nullable: false, default: 'THB' })
  currencyCode: string;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems: OrderItems[];
}
