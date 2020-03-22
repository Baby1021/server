// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPush from '../../../app/service/Push';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';
import ExportBillBillCategoryGetter from '../../../app/service/bill/BillCategoryGetter';
import ExportBillGetter from '../../../app/service/bill/getter';
import ExportBillSetter from '../../../app/service/bill/setter';
import ExportLocationSetter from '../../../app/service/location/setter';

declare module 'egg' {
  interface IService {
    push: ExportPush;
    test: ExportTest;
    user: ExportUser;
    bill: {
      billCategoryGetter: ExportBillBillCategoryGetter;
      getter: ExportBillGetter;
      setter: ExportBillSetter;
    }
    location: {
      setter: ExportLocationSetter;
    }
  }
}
