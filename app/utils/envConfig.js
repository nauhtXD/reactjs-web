/* eslint-disable no-console */
import env from '../env';

const config = {
  develop: {
    apiUrl: 'https://localhost:8080/api/',
    envTag: 'd',
  },
  staging: {
    apiUrl: 'https://api.digihubs.vn/bpa/',
  },
  uat: {
    apiUrl: 'https://api.digihubs.vn/bpa/',
    envTag: 'u',
  },
  production: {
    apiUrl: 'https://api.digihubs.vn/bpa/',
    envTag: 'p',
  },
};
const configEnv = () => {
  switch (env) {
    case 'develop':
      return config.develop;
    case 'uat':
      return config.uat;
    case 'staging':
      return config.staging;
    case 'production':
      return config.production;
    default:
      return config.develop;
  }
};
console.log(env);
export default configEnv();
