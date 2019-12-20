import BaseService from "../../base/BaseService";

/**
 * Test Service
 */
export default class BillSetterService extends BaseService {

  public async addBill(params: any) {
    return await this.billRepo.save(params)
  }

  public async updateBill(params: any) {
    return await this.billRepo.save(params)
  }

  public async deleteBill(billId: any) {
    const bill = await this.getBillById(billId)
    bill.deleted = true
    await bill.save()
  }

}
