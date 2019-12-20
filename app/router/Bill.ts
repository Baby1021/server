import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/bill', controller.billController.getBill);
  router.get('/bill/list', controller.billController.getBillList);

  router.post('/bill', controller.billController.saveBill);

  router.delete('/bill', controller.billController.deleteBill);
};
