import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.typeorm = {
    type: 'mysql',
    charset: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: 'lai756925010',
    database: 'baby',
    synchronize: false,
    entities: ['app/model/**/*.js'],
    migrations: ['app/migration/**/*.js'],
    subscribers: ['app/subscriber/**/*.js'],
  }

  return config;
};
