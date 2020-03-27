import BaseController from "../base/BaseController"

export default class HomeController extends BaseController {
  public async index() {
    const result = this.ctx.request.body
    this.ctx.stdout(result)
  }

  public async pushToken() {
    const result = await this.service.user.savePushToken(this.ctx.request.body)
    this.ctx.stdout(result)
  }

  public async homeInfo() {
    const user = await this.service.user.getUserById(this.getUserId())
    const lover = await this.service.user.getLoverById(this.getUserId())
    const location = await this.service.location.getUserLatestLocation(lover && lover.userId)

    this.ctx.stdout({
      user: {
        name: user.name,
        avatar: user.avatar
      },
      lover: lover ? {
        name: lover.name,
        avatar: lover.avatar,
        addressName: location && location.aoiName
      } : null
    })
  }
}
