import { Application, Context } from 'egg'

export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next()
    } catch (err) {
      const app: Application = ctx.app

      app.emit('error', err, ctx)
      const response: any = {}
      ctx.status = parseInt(err.httpCode, 10) || 200
      response.status = err.status || 500
      response.message = err.message || 'Unknown error'
      ctx.response.status = 200
      ctx.body = response
    }
  }
}
