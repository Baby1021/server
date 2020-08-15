import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import UserModel from "./UserModel";
import LoveModel from "./LoveModel";

/**
 * 动态
 */
@Entity({ name: 'love_comment' })
export default class LoveComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  content: string

  @Column()
  userId: string

  @ManyToOne(type => UserModel)
  @JoinColumn({ name: 'userId' })
  user: UserModel

  @Column()
  loveId: number

  @ManyToOne(type => LoveModel)
  @JoinColumn({ name: 'loveId' })
  love: LoveModel

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
