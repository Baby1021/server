// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/ErrorHandler';
import ExportHttpLogger from '../../../app/middleware/HttpLogger';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    httpLogger: typeof ExportHttpLogger;
  }
}
