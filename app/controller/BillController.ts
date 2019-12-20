import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async get() {
    const { ctx } = this;
    const result = this.ctx.request.body
    this.ctx.stdout(result)
  }

  public async getList() {
    const { ctx } = this;
    const result = this.ctx.request.body
    this.ctx.stdout(result)
  }
}
