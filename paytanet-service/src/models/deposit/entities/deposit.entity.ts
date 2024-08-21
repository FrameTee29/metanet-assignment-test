import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';
import { UserWallet } from '@/models/user/entities/user-wallet.entity';

export enum DepositStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Entity('deposit')
export class Deposit extends BaseEntity {
  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: false,
    default: 0,
  })
  amount: number;

  @Column({ name: 'status', nullable: false, default: DepositStatus.PENDING })
  status: string;

  @Column({ name: 'note', nullable: true })
  note: string;

  @ManyToOne(() => UserWallet, (userWallet) => userWallet.deposits)
  @JoinColumn({ name: 'user_wallet_id' })
  userWallet: UserWallet;
}
