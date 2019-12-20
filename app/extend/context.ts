import { Context } from 'egg'

export default {
  stdout(this: Context, data?: any) {
    this.body = {
      status: 0,
      message: 'success',
      data
    }
  }
}
