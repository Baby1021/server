import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const result  = this.ctx.request.body
    this.ctx.stdout(result)
  }

  public async pushToken(){
    const result = await this.service.user.savePushToken(this.ctx.request.body)
    this.ctx.stdout(result)
  }
}
