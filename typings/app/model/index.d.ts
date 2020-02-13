// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBillCategoryModel from '../../../app/model/BillCategoryModel';
import ExportBillModel from '../../../app/model/BillModel';

declare module 'egg' {
  interface IModel {
    BillCategoryModel: ReturnType<typeof ExportBillCategoryModel>;
    BillModel: ReturnType<typeof ExportBillModel>;
  }
}
