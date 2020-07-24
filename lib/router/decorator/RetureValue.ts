import 'reflect-metadata'
import { METADATA_RETURN_BODY } from '../constants'

export function ReturnBody (target, fnName, descriptor) {
  Reflect.defineMetadata(METADATA_RETURN_BODY, true, target, fnName)
  return descriptor
}
