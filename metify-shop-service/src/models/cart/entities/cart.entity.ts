import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';

import { CartItems } from '@/models/cart/entities/cart-items.entity';

@Entity('cart')
export class Cart extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(() => CartItems, (cartItems) => cartItems.cart)
  cartItems: CartItems[];
}
