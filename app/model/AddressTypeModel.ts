import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

/**
 * 地址类型
 */
@Entity('baby_address_type')
export default class AddressTypeModel extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  icon: string

  @CreateDateColumn()
  created: Date
}
