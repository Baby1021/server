import { Context } from 'egg'

/**
 * 请求 & 响应日志
 */
export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const start = process.hrtime()

    ctx.logger.info(`query：${JSON.stringify(ctx.request.query)}`)
    ctx.logger.info(`body：${JSON.stringify(ctx.request.body)}`)

    await next()
    const end = process.hrtime(start)
    const cost = Math.round(end[0] * 1000 + end[1] / 1000000)

    ctx.logger.info(`Time: ${cost} ms -----\n`)
    ctx.logger.info(`response：${JSON.stringify(ctx.response.body)}`)
  }
}
