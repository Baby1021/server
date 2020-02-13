import BaseService from "../../base/BaseService";

/**
 * Test Service
 */
export default class BillSetterService extends BaseService {

  public async addBill(params: any) {
    return await this.billRepo.save(params)
  }

  public async updateBill(params: any) {
    const bill = await this.billRepo.findOne(params.billId)

    if (!bill) {
      throw Error(`账单不存在`)
    }

    if (params.categoryId) {
      const category = await this.billCategoryRepo.findOne({ id: params.categoryId })

      if (!category) {
        throw Error(`账单分类不存在`)
      }

      bill.category = category
    }

    if (params.content) {
      bill.content = params.content
    }

    if (params.type) {
      bill.type = params.type
    }

    if (params.money) {
      bill.money = params.money
    }

    await bill.save()

    return bill
  }

  public async deleteBill(billId: any) {
    const bill = await this.getBillById(billId)
    bill.deleted = true
    await bill.save()
  }

}
