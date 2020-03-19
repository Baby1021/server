import { Application } from 'egg';
import Bill from "./router/Bill"
import Location from "./router/Location"
import PushRouter from "./router/PushRouter"

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  Bill(app)
  Location(app)
  PushRouter(app)
};
