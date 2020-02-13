// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportBillBillTypeGetter from '../../../app/service/bill/BillTypeGetter';
import ExportBillGetter from '../../../app/service/bill/getter';
import ExportBillSetter from '../../../app/service/bill/setter';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    bill: {
      billTypeGetter: ExportBillBillTypeGetter;
      getter: ExportBillGetter;
      setter: ExportBillSetter;
    }
  }
}
