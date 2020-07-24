import 'reflect-metadata'
import { METADATA_HTTP_PARAMS } from '../constants'

function defineProperty (type, name, rule?) {
  return (target, fnName, index) => {
    const value = Reflect.getOwnMetadata(METADATA_HTTP_PARAMS, target, fnName) || []
    value.push({ type, index, name, rule })
    Reflect.defineMetadata(METADATA_HTTP_PARAMS, value, target, fnName)
  }
}

export function Query (name: string, rule?) {
  return defineProperty('query', name, rule)
}

export function Params (name: string, rule?) {
  return defineProperty('params', name, rule)
}

export function Body (name: string, rule?) {
  return defineProperty('body', name, rule)
}
