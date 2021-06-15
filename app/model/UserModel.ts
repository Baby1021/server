import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm"
import AddressModel from "./AddressModel"

/**
 * 每次启动的定位
 */
@Entity('baby_user')
export default class UserModel extends BaseEntity {

  @PrimaryColumn()
  userId: string

  @Column()
  password: string

  @Column()
  name: string

  @Column({ nullable: true })
  loverId: string

  @OneToOne(type => UserModel)
  @JoinColumn({ name: 'loverId' })
  lover: UserModel

  @OneToMany(type => AddressModel, address => address.user)
  addresses: AddressModel[]

  @Column({ nullable: true })
  currentAddressId: number

  @OneToOne(type => AddressModel)
  @JoinColumn({ name: 'currentAddressId' })
  address: AddressModel

  @Column({ nullable: true })
  pushToken: string

  @Column({ nullable: true })
  avatar: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}

