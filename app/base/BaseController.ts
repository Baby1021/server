import { Controller } from 'egg';

export default class BaseController extends Controller {

  validate(params, rules) {
    this.ctx.helper.validate(this.ctx, rules, params)
  }
}
