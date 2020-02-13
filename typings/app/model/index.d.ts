// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBillModel from '../../../app/model/BillModel';
import ExportBillTypeModel from '../../../app/model/BillTypeModel';

declare module 'egg' {
  interface IModel {
    BillModel: ReturnType<typeof ExportBillModel>;
    BillTypeModel: ReturnType<typeof ExportBillTypeModel>;
  }
}
