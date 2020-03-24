import { Application } from 'egg';
import Bill from "./router/Bill"
import Location from "./router/Location"
import PushRouter from "./router/PushRouter"

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.put('/api/v1/user/pushToken', controller.home.pushToken);

  // 首页
  router.get('/api/v1/home/info', controller.home.homeInfo);

  Bill(app)
  Location(app)
  PushRouter(app)
};
