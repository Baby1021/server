import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import UserModel from "./UserModel"
import AddressTypeModel from "./AddressTypeModel"

/**
 * 地址
 */
@Entity('address')
export default class AddressModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  // 地址简称（aoiName)
  @Column()
  name: string;

  // 详细地址(pname + cityname + adname + business_area + address
  @Column()
  detail: string

  // 经度
  @Column()
  longitude: string;

  // 维度
  @Column()
  latitude: string;

  @Column()
  userId: number

  @Column()
  typeId: string

  // 地址类型
  @ManyToOne(type => AddressTypeModel)
  @JoinColumn({ name: 'typeId' })
  type: AddressTypeModel

  @ManyToOne(type => UserModel, user => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: UserModel

  @Column()
  addressId: string

  @Column({ type: 'json' })
  address: any

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
