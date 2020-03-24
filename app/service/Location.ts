import BaseService from "../base/BaseService";
import AddressModel from "../model/AddressModel"
import UserLocationModel from "../model/UserLocationModel"
import * as _ from 'lodash';
import { In } from "typeorm"

/**
 * 定位信息
 */
export default class LocationService extends BaseService {

  public async getUserLatestLocation(userId) {
    return this.userLocationRepo.findOne({
      where: { userId },
      order: { created: 'DESC' },
    })
  }

  public async saveLocation(params: any) {
    const location = await this.userLocationRepo.save(params)
    this.isInFence(location)
    return '保存定位成功'
  }

  private async isInFence(location: UserLocationModel) {
    const user = await this.service.user.getUserById(location.userId)
    const checkResult = await this.app.alimap.checkInGeoFence(location.longitude, location.latitude)

    let fences = _.filter(checkResult.data.fencing_event_list, { client_status: 'in' })
    if (_.isEmpty(fences)) {
      this.logger.info(`上报的定位没有命中围栏`)
      return
    }

    const address = await this.addressRepo.findOne({
      where: {
        userId: location.userId,
        fenceId: In(_.map(fences, 'fence_info.fence_gid'))
      },
      relations: ['user', 'type']
    })

    if (!address) {
      this.logger.info(`用户不属于当前围栏`)
      return
    }
    this.logger.info(`${user.name} 在 ${address.detail}中`)

    // 相同地址
    if (user.currentAddressId === address.id) {
      this.logger.info(`用户在同一地址`)
      return
    }

    await this.service.push.pushLoverWhereYouAre(address)
    // 更新用户的实时位置
    await this.userRepo.update({ userId: user.userId }, { currentAddressId: address.id })
    this.logger.info(`已更新${user.userId}的实时地址为${address.id},${address.name}`)
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
    let oldAddressId
    if (existAddress) {
      this.logger.info(`更新地址`)
      oldAddressId = existAddress.addressId
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
      this.logger.info(`新建地址`)
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

    if (oldAddressId !== addressId) {
      this.createAddressFence(userAddress)
    }

    await this.service.push.pushLoverWhenAddressIsUpdate(userAddress)

    return userAddress
  }

  private async createAddressFence(address: AddressModel) {
    const user = await this.service.user.getUserById(address.userId)
    if (address.fenceId) {
      await this.app.alimap.updateGeoFence(address.fenceId, `${user.name}的${address.type.name}`, address.longitude, address.latitude)
      this.logger.info(`更新地址的围栏成功`)
    } else {
      const fenceResult = await this.app.alimap.createGeoFence(`${user.name}的${address.type.name}`, address.longitude, address.latitude)
      await this.addressRepo.update({ id: address.id }, { fenceId: fenceResult.data.gid })
      this.logger.info(`创建围栏成功`)
    }
  }

}
