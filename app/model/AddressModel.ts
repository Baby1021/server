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
@Entity('baby_address')
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

  // 高德地图poiId
  @Column()
  addressId: string

  // 高德地图 原始数据
  @Column({ type: 'json' })
  address: any

  // 高德地图围栏Id
  @Column({ nullable: true })
  fenceId: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
