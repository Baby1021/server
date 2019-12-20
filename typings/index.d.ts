import 'egg';
import { Connection } from "typeorm";

declare module 'egg' {

  interface Application {
    typeorm: Connection
  }

  interface Context {
  }

  interface Controller {
  }
}
