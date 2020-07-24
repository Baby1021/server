import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  }
};

export default plugin;
