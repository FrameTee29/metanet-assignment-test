import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';

import { Cart } from '@/models/cart/entities/cart.entity';
import { Product } from '@/models/product/entities/product.entity';

@Entity('cart_items')
export class CartItems extends BaseEntity {
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'quantity', default: 0 })
  quantity: number;
}
