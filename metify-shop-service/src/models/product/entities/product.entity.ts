import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';

import { CartItems } from '@/models/cart/entities/cart-items.entity';

@Entity('product')
export class Product extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({
    name: 'price',
    comment: 'Price in THB',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({ name: 'quantity', default: 0 })
  quantity: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @OneToMany(() => CartItems, (cartItems) => cartItems.product)
  cartItems: CartItems[];

  @OneToMany(() => CartItems, (cartItems) => cartItems.product)
  orderItems: CartItems[];
}
