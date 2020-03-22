import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm"
import UserModel from "./UserModel"

/**
 * 地址类型
 */
@Entity('address_type')
export default class AddressTypeModel extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  icon: string

  @CreateDateColumn()
  created: Date
}
