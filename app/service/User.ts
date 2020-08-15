import BaseService from "../base/BaseService"
import UserModel from "../model/UserModel";

export default class UserService extends BaseService {

  async getUserAndLover(userId: string): Promise<{ user: UserModel, lover: UserModel }> {
    const user = await UserModel.findOne({
      where: { userId },
      relations: ['lover']
    })

    if (!user) {
      this.logger.error(`用户不存在`, userId)
      throw Error(`用户不存在`)
    }

    return {
      user: user,
      lover: user.lover
    }
  }

  async getUserById(userId) {
    const user = await this.userRepo.findOne(userId)

    if (!user) {
      throw Error(`用户不存在`)
    }

    return user
  }

  async getLoverById(userId) {
    const user = await this.userRepo.findOne({ relations: ['lover'], where: { userId } })
    return user ? user.lover : undefined
  }

  async savePushToken(params: any) {
    const user = await this.userRepo.update({ userId: params.userId }, { pushToken: params.pushToken })
    return user
  }
}







