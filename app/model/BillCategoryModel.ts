import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

// 账单类型
@Entity({ name: 'bill_category' })
export default class BillCategoryModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: 'https://s2.ax1x.com/2020/02/13/1O4sBt.png' })
  icon: string

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
