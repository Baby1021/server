import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.typeorm = {
    type: 'mysql',
    entityPrefix: 'baby_',
    charset: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
    database: 'baby',
    synchronize: true,
    logging: ['query'],
    entities: ['app/model/**/*{.ts,.js}'],
    migrations: ['app/migration/**/*{.ts,.js}'],
    subscribers: ['app/subscriber/**/*{.ts,.js}'],
  }

  return config;
};
