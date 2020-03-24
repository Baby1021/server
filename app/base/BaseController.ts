import { Controller } from 'egg';

export default class BaseController extends Controller {

  getUserId() {
    return this.ctx.request.query.userId
  }

  validate(params, rules) {
    this.ctx.helper.validate(this.ctx, rules, params)
  }
}
