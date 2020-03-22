import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.security = {
    csrf: {
      enable: false
    }
  }

  config.cors = {
    origin: ctx => ctx.get('origin'),
    credentials: true,
  }

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576848686332_170';

  // add your egg config in here
  config.middleware = ['errorHandler', 'httpLogger']

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    umeng: {
      appKey: "5c5b0ca1b465f5e9d900076d",
      messageSecret: "45c70be2fea946a61cac41d3870714de",
      masterSecret: "kflmfumfeeatuinmlb9hzrnsgr88dt76",
      baseUrl: "https://msgapi.umeng.com/api/send"
    },
    alimap: {
      key: 'b7b526e40df19650c4618760a34ee7a0'
    }
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
