import BaseService from "../../base/BaseService";

/**
 * 定位信息
 */
export default class LocationSetter extends BaseService {

  public async saveLocation(params: any) {
    await this.userLocationRepo.insert(params)
    return '保存定位成功'
  }

  public async getUserAddressByType(userId, typeId) {
    const address = await this.addressRepo.findOne({
      relations: ['type', 'user'],
      where: {
        type: { id: typeId },
        user: { userId }
      }
    })

    return address
  }

  /**
   * 保存用户地址
   */
  public async saveUserAddress(params: any) {
    const { userId, addressId, typeId = 'home_address' } = params

    const [{ pois: [address] }, type, existAddress] = await Promise.all([
      this.app.alimap.getLocation(addressId),
      this.addressTypeRepo.findOneOrFail(typeId),
      this.getUserAddressByType(userId, typeId)
    ])

    let userAddress
    if (existAddress) {
      existAddress.name = address.name
      existAddress.detail = address.pname + address.cityname + address.adname + address.business_area + address.address
      existAddress.longitude = address.location.split(',')[0]
      existAddress.latitude = address.location.split(',')[1]
      existAddress.address = address
      existAddress.addressId = addressId
      existAddress.type = type
      await existAddress.save()
      userAddress = existAddress
    } else {
      userAddress = await this.addressRepo.save({
        name: address.name,
        detail: address.pname + address.cityname + address.adname + address.business_area + address.address,
        longitude: address.location.split(',')[0],
        latitude: address.location.split(',')[1],
        addressId,
        address,
        userId: userId,
        type: type
      })
    }

    await this.service.push.pushLoverWhenAddressIsUpdate(userAddress)

    return userAddress
  }

}
