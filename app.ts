import { Application } from 'egg'

export default class AppBootHook {
    private app: Application

    constructor (app) {
        this.app = app
    }

    async didLoad () {
    }

    async didReady () {
    }

    async serverDidReady () {
    }

    async beforeClose () {
    }
}
