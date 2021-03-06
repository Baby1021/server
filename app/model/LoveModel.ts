import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import UserModel from "./UserModel";
import LoveComment from "./LoveComment";

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

  @OneToMany(type => LoveComment, comment => comment.love)
  comments: LoveComment[]

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
