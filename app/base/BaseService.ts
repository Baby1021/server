import { Service } from 'egg';
import { Repository } from "typeorm";
import BillModel from "../model/BillModel";

export default class BaseService extends Service {

  billRepo: Repository<BillModel>

  constructor(ctx) {
    super(ctx)
    this.billRepo = ctx.app.typeorm.getRepository(BillModel)
  }

  async getBillById(id) {
    try {
      return this.billRepo.findOneOrFail(id)
    } catch (e) {
      throw Error(`不存在账单数据，账单Id:${id}`)
    }
  }
}
