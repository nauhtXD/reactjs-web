import env from '../env';

const config = {
  develop: {
    apiUrl: 'http://localhost:8080/api/',
    apiUrlMinio: 'http://localhost:9090/',
    apiUrlWeather: 'http://api.openweathermap.org/data/2.5/',
    envTag: 'd',
  },
  staging: {
    apiUrl: 'https://api.digihubs.vn/bpa/',
    apiUrlMinio: 'http://localhost:9090/',
    apiUrlWeather: 'http://api.openweathermap.org/data/2.5/',
  },
  uat: {
    apiUrl: 'https://api.digihubs.vn/bpa/',
    apiUrlMinio: 'http://localhost:9090/',
    apiUrlWeather: 'http://api.openweathermap.org/data/2.5/',
    envTag: 'u',
  },
  production: {
    apiUrl: 'https://api.digihubs.vn/bpa/',
    apiUrlMinio: 'http://localhost:9090/',
    apiUrlWeather: 'http://api.openweathermap.org/data/2.5/',
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

export default configEnv();
