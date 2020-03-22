import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
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

  // 地址类型
  @ManyToMany(type => AddressTypeModel)
  @JoinTable({
    name: 'relation_address_and_addresstype',
    joinColumn: {
      name: "addressId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "typeId",
      referencedColumnName: "id"
    }
  })
  type: AddressTypeModel

  @ManyToOne(type => UserModel, user => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: UserModel

  @CreateDateColumn()
  created: Date
}
