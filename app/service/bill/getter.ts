import BaseService from "../../base/BaseService";

/**
 * 账单的获取
 */
export default class BillGetter extends BaseService {

  public async getBill(billId: number) {
    return this.getBillById(billId)
  }

  public async getBillList() {
    return this.billRepo.find({
      where: { deleted: false },
      relations: ['category']
    })
  }
}
