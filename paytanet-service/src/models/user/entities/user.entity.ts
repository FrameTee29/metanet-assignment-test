import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';
import { UserAuth } from '@/models/user/entities/user-auth.entity';
import { UserWallet } from '@/models/user/entities/user-wallet.entity';
import { UserAddress } from '@/models/user/entities/user-address.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @OneToOne(() => UserAuth, (userAuth) => userAuth.user)
  userAuth: UserAuth;

  @OneToOne(() => UserAddress, (userAddress) => userAddress.user)
  userAddress: UserAddress;

  @OneToMany(() => UserWallet, (userWallet) => userWallet.user)
  userWallets: UserWallet[];
}
