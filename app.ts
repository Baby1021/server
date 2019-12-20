import { Application } from 'egg'
import { createConnection } from "typeorm";

export default class AppBootHook {
  private app: Application

  constructor(app) {
    this.app = app

  }

  async didLoad() {
    this.app.typeorm = await createConnection(this.app.config.typeorm)
    this.app.logger.info(`数据库初始化成功`)
  }

  async didReady() {
  }

  async serverDidReady() {
  }

  async beforeClose() {
  }
}
