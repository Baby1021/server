import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/api/v1/location/report', controller.locationController.reportLocation);
  // 搜索地址
  router.get('/api/v1/location/search', controller.locationController.searchLocation);
  // 保存用户地址
  router.post('/api/v1/location/save', controller.locationController.saveUserLocation);
};
