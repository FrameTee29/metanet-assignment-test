import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';
import { User } from '@/models/user/entities/user.entity';

@Entity('user_address')
export class UserAddress extends BaseEntity {
  @Column({ name: 'address', nullable: false })
  address: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'province', nullable: false })
  province: string;

  @Column({ name: 'country', nullable: false })
  country: string;

  @Column({ name: 'zip_code', nullable: false })
  zipCode: string;

  @OneToOne(() => UserAddress, (userAddress) => userAddress.user)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
