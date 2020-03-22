// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddressModel from '../../../app/model/AddressModel';
import ExportAddressTypeModel from '../../../app/model/AddressTypeModel';
import ExportBillCategoryModel from '../../../app/model/BillCategoryModel';
import ExportBillModel from '../../../app/model/BillModel';
import ExportUserLocation from '../../../app/model/UserLocation';
import ExportUserModel from '../../../app/model/UserModel';

declare module 'egg' {
  interface IModel {
    AddressModel: ReturnType<typeof ExportAddressModel>;
    AddressTypeModel: ReturnType<typeof ExportAddressTypeModel>;
    BillCategoryModel: ReturnType<typeof ExportBillCategoryModel>;
    BillModel: ReturnType<typeof ExportBillModel>;
    UserLocation: ReturnType<typeof ExportUserLocation>;
    UserModel: ReturnType<typeof ExportUserModel>;
  }
}
