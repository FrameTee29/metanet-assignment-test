import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';

import { User } from '@/models/user/entities/user.entity';
import { Deposit } from '@/models/deposit/entities/deposit.entity';
import { Currency } from '@/models/currency/entities/currency.entity';
import { Withdraw } from '@/models/withdraw/entities/withdraw.entity';

@Entity('user_wallet')
export class UserWallet extends BaseEntity {
  @Column({
    name: 'balance',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: false,
    default: 0,
  })
  balance: number;

  @ManyToOne(() => User, (user) => user.userWallets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Currency, (currency) => currency.userWallets)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

  @OneToMany(() => Deposit, (deposit) => deposit.userWallet)
  deposits: Deposit[];

  @OneToMany(() => Withdraw, (withdraw) => withdraw.userWallet)
  Withdraws: Withdraw[];
}
