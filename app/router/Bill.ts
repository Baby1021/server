import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/bill', controller.home.index);
  router.get('/bill/list', controller.home.index);

  // 添加一笔账单
  router.post('/bill', controller.billController.get);
};
