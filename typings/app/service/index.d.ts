// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddress from '../../../app/service/Address';
import ExportLocation from '../../../app/service/Location';
import ExportPush from '../../../app/service/Push';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';
import ExportBillBillCategoryGetter from '../../../app/service/bill/BillCategoryGetter';
import ExportBillGetter from '../../../app/service/bill/getter';
import ExportBillSetter from '../../../app/service/bill/setter';

declare module 'egg' {
  interface IService {
    address: ExportAddress;
    location: ExportLocation;
    push: ExportPush;
    test: ExportTest;
    user: ExportUser;
    bill: {
      billCategoryGetter: ExportBillBillCategoryGetter;
      getter: ExportBillGetter;
      setter: ExportBillSetter;
    }
  }
}
