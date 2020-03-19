import BaseService from "../../base/BaseService";

/**
 * 定位信息
 */
export default class LocationSetter extends BaseService {

  public async saveLocation(params: any) {
    await this.userLocationRepo.insert(params)
    return '保存定位成功'
  }

}
