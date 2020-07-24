import 'egg'
import { Connection } from 'typeorm'
import AliMap from '../app/sdk/AliMap'

declare module 'egg' {

  interface Application {
    typeorm: Connection
    alimap: AliMap

    [key: string]: any
  }

  interface Context {
  }

  interface Controller {
  }
}
