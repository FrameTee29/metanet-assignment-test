import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';
import { UserWallet } from '@/models/user/entities/user-wallet.entity';

@Entity('')
export class Currency extends BaseEntity {
  @Column({ name: 'currency_name', nullable: false })
  currencyName: string;

  @Column({ name: 'currency_code', nullable: false })
  currencyCode: string;

  @Column({ name: 'current_symbol', nullable: false })
  currencySymbol: string;

  @Column({ name: 'flag_image', nullable: true })
  flagImage: string;

  @Column({ name: 'is_default', nullable: false, default: false })
  isDefault: boolean;

  @OneToMany(() => UserWallet, (userWallet) => userWallet.currency)
  userWallets: UserWallet[];
}
