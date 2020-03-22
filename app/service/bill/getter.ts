import BaseService from "../../base/BaseService";

/**
 * 账单的获取
 */
export default class BillGetter extends BaseService {

  public async getBill(billId: number) {
    try {
      return this.billRepo.findOneOrFail(billId)
    } catch (e) {
      throw Error(`不存在账单数据，账单Id:${billId}`)
    }
  }

  public async getBillList() {
    return this.billRepo.find({
      where: { deleted: false },
      relations: ['category']
    })
  }
}
