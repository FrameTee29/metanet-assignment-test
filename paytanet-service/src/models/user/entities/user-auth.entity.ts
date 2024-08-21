import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '@/shared/models/base.entity';
import { User } from '@/models/user/entities/user.entity';

@Entity('user_auth')
export class UserAuth extends BaseEntity {
  @Column({ name: 'username', nullable: false })
  username: string;

  @Exclude()
  @Column({ name: 'password', nullable: false })
  password: string;

  @Exclude()
  @Column({ name: 'salt', nullable: false })
  salt: string;

  @OneToOne(() => User, (user) => user.userAuth)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
