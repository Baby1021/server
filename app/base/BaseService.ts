import { Service } from 'egg';
import { Repository } from "typeorm";
import BillModel from "../model/BillModel";
import BillCategoryModel from "../model/BillCategoryModel"

export default class BaseService extends Service {

  billRepo: Repository<BillModel>
  billCategoryRepo: Repository<BillCategoryModel>

  constructor(ctx) {
    super(ctx)
    this.billRepo = ctx.app.typeorm.getRepository(BillModel)
    this.billCategoryRepo = ctx.app.typeorm.getRepository(BillCategoryModel)
  }

  async getBillById(id) {
    try {
      return this.billRepo.findOneOrFail(id)
    } catch (e) {
      throw Error(`不存在账单数据，账单Id:${id}`)
    }
  }
}
