import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import UserModel from "./UserModel"

/**
 * 每次启动的定位
 */
@Entity('user_location')
export default class UserLocation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string;

  @ManyToOne(type => UserModel)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column()
  accuracy: number;

  @Column()
  adCode: string;

  @Column()
  address: string;

  @Column()
  altitude: number;

  @Column()
  aoiName: string;

  @Column()
  bearing: number;

  @Column()
  buildingId: string;

  @Column()
  city: string;

  @Column()
  cityCode: string;

  @Column()
  country: string;

  @Column()
  description: string;

  @Column()
  district: string;

  @Column()
  floor: string;

  @Column()
  gpsAccuracyStatus: number;

  @Column()
  latitude: string;

  @Column()
  locationDetail: string;

  @Column()
  longitude: string;

  @Column()
  poiName: string;

  @Column()
  province: string;

  @Column()
  speed: number;

  @Column()
  street: string;

  @Column()
  streetNum: string;

  @CreateDateColumn()
  created: Date
}
