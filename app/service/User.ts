import BaseService from "../base/BaseService"

export default class UserService extends BaseService {

  async getUserById(userId) {
    const user = await this.userRepo.findOne(userId)

    if (!user) {
      throw Error(`用户不存在`)
    }

    return user
  }

  async getLoverById(userId) {
    const user = await this.userRepo.findOne({ relations: ['lover'], where: { userId } })
    return user?.lover
  }

  async savePushToken(params: any) {
    const user = await this.userRepo.update({ userId: params.userId }, { pushToken: params.pushToken })
    return user
  }
}







