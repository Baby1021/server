import 'reflect-metadata'
import { EggRouter } from '../EggRouter'
import { Role } from '../../../app/const/Role'

function defineProperty (method, params) {
  return (target, fnName, descriptor) => {
    EggRouter.addPath(target, { name: fnName, method, params })
    return descriptor
  }
}

function convertParams (path: string, roles?: Role[] | Role) {

  if (!roles) {
    return { path }
  }

  if (typeof roles === 'string') {
    return { path, roles: [roles] }
  } else {
    return { path, roles }
  }
}

export function GET (path: string, roles?: Role[] | Role) {
  return defineProperty('get', convertParams(path, roles))
}

export function POST (path: string, roles?: Role[] | Role) {
  return defineProperty('post', convertParams(path, roles))
}

export function PUT (path: string, roles?: Role[] | Role) {
  return defineProperty('put', convertParams(path, roles))
}

export function DELETE (path: string, roles?: Role[] | Role) {
  return defineProperty('delete', convertParams(path, roles))
}
