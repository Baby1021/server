import { Application } from 'egg';
import Bill from "./router/Bill"

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  Bill(app)
};
