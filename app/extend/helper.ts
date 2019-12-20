import { Application, Context } from "egg";
import * as _ from 'lodash';

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
}
