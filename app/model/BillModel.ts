import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

// 账单
@Entity({ name: 'bill' })
export default class BillModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column({ default: 0 })
  money: number

  // 收入或支出
  @Column({ default: 'spending' })
  type: BillType

  // 收入或支出
  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}

export const billTypeArray = ['income', 'spending']
type BillType = 'income' | 'spending'
