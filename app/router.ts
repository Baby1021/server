import { Application } from 'egg';
import Bookkeeping from "./router/Bill";

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  Bookkeeping(app)
};
