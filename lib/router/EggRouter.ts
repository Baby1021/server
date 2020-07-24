import { Application } from 'egg'
import { METADATA_HTTP_PARAMS, METADATA_RETURN_BODY } from './constants'
import * as _ from 'lodash'

export class EggRouter {

  private static routes = new Map<any, any[]>()

  static addPath (target, params) {
    if (this.routes.has(target)) {
      this.routes.get(target)?.push(params)
    } else {
      this.routes.set(target, [params])
    }
  }

  static init (app: Application) {
    const { router } = app

    for (const target of this.routes.keys()) {

      for (const {
        name,
        method,
        params: { path, roles }
      } of this.routes.get(target) as any) {

        const paths = target.pathName
        const roleMiddleware = _.isEmpty(roles) ? [] : roles.map(role => app.role.can(role))

        const params = Reflect.getMetadata(METADATA_HTTP_PARAMS, target, name)

        router[method](`${path}`, ...roleMiddleware, async ctx => {
          const controller = new target.constructor(ctx)

          // 参数校验
          const test = _.chain(params)
            .sortBy('index')
            .map(({ type, name, rule }) => {

              let value
              if (type === 'params') {
                value = ctx.params[name]
              } else if (type === 'query') {
                value = ctx.request.query[name]
              } else if (type === 'body') {
                value = ctx.request.body[name]
              }

              if (rule) {
                const rules = { [name]: rule }
                const errors = app.validator.validate(rules, { [name]: value })
                if (errors && errors.length) {
                  throw {
                    status: 400,
                    message: errors
                  }
                }
              }

              return value
            })
            .value()

          // 返回值
          if (Reflect.hasMetadata(METADATA_RETURN_BODY, target, name)) {
            const data = await controller[name](...test)
            ctx.stdout(data)
          } else {
            await controller[name](...test)
          }

        })

        app.logger.info(`路径：${path}`, `权限：${roles}`, `方法：${paths}.${name}`)
      }
    }
  }
}
