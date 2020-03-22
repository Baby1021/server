import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import BillCategoryModel from "./BillCategoryModel"

// 账单
@Entity({ name: 'bill' })
export default class BillModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column({ default: 0, type: "float" })
  money: number

  // 收入或支出
  @Column({ default: 'spending' })
  type: BillType

  @ManyToOne(() => BillCategoryModel)
  @JoinColumn({ name: "categoryId" })
  category: BillCategoryModel

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
