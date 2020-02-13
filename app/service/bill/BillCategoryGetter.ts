import BaseService from "../../base/BaseService";

/**
 * 账单类型
 */
export default class BillCategoryGetterService extends BaseService {

  public async getBillCategoryList() {
    return this.billCategoryRepo.find({ deleted: false })
  }

}
