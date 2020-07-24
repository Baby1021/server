import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import UserModel from "./UserModel";

/**
 * 动态
 */
@Entity({ name: 'love' })
export default class LoveModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  content: string

  @Column()
  userId: string

  @ManyToOne(type => UserModel)
  @JoinColumn({ name: 'userId' })
  user: UserModel

  @Column({ type: 'json', nullable: true })
  images: string[]

  @Column({ default: false })
  remind: boolean

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
