// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddressModel from '../../../app/model/AddressModel';
import ExportAddressTypeModel from '../../../app/model/AddressTypeModel';
import ExportBillCategoryModel from '../../../app/model/BillCategoryModel';
import ExportBillModel from '../../../app/model/BillModel';
import ExportLoveComment from '../../../app/model/LoveComment';
import ExportLoveModel from '../../../app/model/LoveModel';
import ExportUserLocationModel from '../../../app/model/UserLocationModel';
import ExportUserModel from '../../../app/model/UserModel';

declare module 'egg' {
  interface IModel {
    AddressModel: ReturnType<typeof ExportAddressModel>;
    AddressTypeModel: ReturnType<typeof ExportAddressTypeModel>;
    BillCategoryModel: ReturnType<typeof ExportBillCategoryModel>;
    BillModel: ReturnType<typeof ExportBillModel>;
    LoveComment: ReturnType<typeof ExportLoveComment>;
    LoveModel: ReturnType<typeof ExportLoveModel>;
    UserLocationModel: ReturnType<typeof ExportUserLocationModel>;
    UserModel: ReturnType<typeof ExportUserModel>;
  }
}
