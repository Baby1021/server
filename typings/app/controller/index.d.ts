// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBillController from '../../../app/controller/BillController';
import ExportLocationController from '../../../app/controller/LocationController';
import ExportPushController from '../../../app/controller/PushController';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    billController: ExportBillController;
    locationController: ExportLocationController;
    pushController: ExportPushController;
    home: ExportHome;
  }
}
