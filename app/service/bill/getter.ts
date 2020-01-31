import BaseService from "../../base/BaseService";

/**
 * Test Service
 */
export default class Test extends BaseService {

  public async getBill(billId: number) {
    return this.getBillById(billId)
  }

  public async getBillList() {
    return this.billRepo.find({ deleted: false })
  }
}
