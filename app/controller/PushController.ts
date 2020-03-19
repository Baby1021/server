import { Controller } from 'egg';

export default class LocationController extends Controller {

  public async push() {
    const result = await this.service.push.pushNotificationForUser(
      this.ctx.request.query.title,
      this.ctx.request.query.desc,
      this.ctx.request.query.device,
    )
    this.ctx.stdout(result)
  }

}
