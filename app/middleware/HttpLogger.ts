import { Context } from 'egg'
import * as os from 'os'
import * as ip from 'ip'

/**
 * 请求 & 响应日志
 */
export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 1. logger request
    /* tslint:disable:no-unused-expression */
    // ctx.logger.info('\n<----- [HTTP] Request -----\n', ctx.request)
    // 2. record start time
    const start = process.hrtime()
    // 3. wait call stack
    await next()
    // 4. record end time
    const end = process.hrtime(start)
    // 5. calc server cost
    const cost = Math.round(end[0] * 1000 + end[1] / 1000000)
    // 6. set response header
    // @see https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
    const response = ctx.response
    const headers = response.headers
    for (const key of Object.keys(headers)) {
      response.set(key, headers[key])
    }
    response.set('X-Response-Time', `${cost} ms`)
    response.set('X-Powered-By', 'MRN')
    response.set('X-Server-IP', ip.address())
    response.set('HOST', os.hostname())
    ctx.logger.info(`----- [COST] API Response Time: ${cost} ms -----\n`)
    // 7. logger response
    /* tslint:disable:no-unused-expression */
    // ctx.logger.info('\n----- [HTTP] Response ----->\n', ctx.response.body)
  }
}
