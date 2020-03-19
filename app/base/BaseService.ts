import { Service } from 'egg';
import { Repository } from "typeorm";
import BillModel from "../model/BillModel";
import BillCategoryModel from "../model/BillCategoryModel"
import UserLocation from "../model/UserLocation"

export default class BaseService extends Service {

  billRepo: Repository<BillModel>
  billCategoryRepo: Repository<BillCategoryModel>
  userLocationRepo: Repository<UserLocation>

  constructor(ctx) {
    super(ctx)
    this.billRepo = ctx.app.typeorm.getRepository(BillModel)
    this.billCategoryRepo = ctx.app.typeorm.getRepository(BillCategoryModel)
    this.userLocationRepo = ctx.app.typeorm.getRepository(UserLocation)
  }
}
