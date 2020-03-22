import { Application, Context } from "egg";
import * as _ from 'lodash';
import { BaseContextClass } from '../../typings/app';

const crypto = require('crypto');

const getFirstErrorMessage = errors => {
  const firstError = _.head(errors)
  return `${_.get(firstError, 'code', '')}: ${_.get(firstError, 'field', '')}`
}

export default {
  validate(ctx: Context, rules, payload): boolean {
    const app: Application = ctx.app
    const errors = app.validator.validate(rules, payload)
    if (_.get(errors, 'length')) {
      throw {
        status: 400,
        message: getFirstErrorMessage(errors)
      }
    }
    return true
  },

  /**
   * 获取签名
   */
  getPushUrlWithSign(this: BaseContextClass, params) {
    const sign = crypto.createHash('md5')
      .update(`POST${this.config.umeng.baseUrl}${JSON.stringify(params)}${this.config.umeng.masterSecret}`)
      .digest('hex');
    return `${this.config.umeng.baseUrl}?sign=${sign}`
  }
}
