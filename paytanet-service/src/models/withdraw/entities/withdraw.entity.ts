import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';
import { UserWallet } from '@/models/user/entities/user-wallet.entity';

export enum WithdrawStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Entity('withdraw')
export class Withdraw extends BaseEntity {
  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: false,
    default: 0,
  })
  amount: number;

  @Column({ name: 'status', nullable: false, default: WithdrawStatus.PENDING })
  status: string;

  @Column({ name: 'note', nullable: true })
  note: string;

  @ManyToOne(() => UserWallet, (userWallet) => userWallet.deposits)
  userWallet: UserWallet;
}
