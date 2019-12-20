// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBillModel from '../../../app/model/BillModel';

declare module 'egg' {
  interface IModel {
    BillModel: ReturnType<typeof ExportBillModel>;
  }
}
