import { Service } from 'egg';
import { Repository } from "typeorm";
import BillModel from "../model/BillModel";
import BillCategoryModel from "../model/BillCategoryModel"
import UserLocation from "../model/UserLocation"
import AddressModel from "../model/AddressModel"
import AddressTypeModel from "../model/AddressTypeModel"
import UserModel from "../model/UserModel"

export default class BaseService extends Service {

  userRepo: Repository<UserModel>
  billRepo: Repository<BillModel>
  billCategoryRepo: Repository<BillCategoryModel>
  userLocationRepo: Repository<UserLocation>
  addressRepo: Repository<AddressModel>
  addressTypeRepo: Repository<AddressTypeModel>

  constructor(ctx) {
    super(ctx)
    this.userRepo = ctx.app.typeorm.getRepository(UserModel)
    this.billRepo = ctx.app.typeorm.getRepository(BillModel)
    this.billCategoryRepo = ctx.app.typeorm.getRepository(BillCategoryModel)
    this.userLocationRepo = ctx.app.typeorm.getRepository(UserLocation)
    this.addressRepo = ctx.app.typeorm.getRepository(AddressModel)
    this.addressTypeRepo = ctx.app.typeorm.getRepository(AddressTypeModel)
  }
}
