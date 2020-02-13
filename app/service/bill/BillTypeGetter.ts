import BaseService from "../../base/BaseService";

/**
 * 账单类型
 */
export default class BillTypeGetterService extends BaseService {

  public async getBillTypeList() {
    return this.billTypeRepo.find({ deleted: false })
  }

}
