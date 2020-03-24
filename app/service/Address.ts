import BaseService from "../base/BaseService"

/**
 * 用户地址
 */
export default class AddressService extends BaseService {

  async getUserAddress(userId) {
    return this.addressRepo.findOne(userId)
  }
}
