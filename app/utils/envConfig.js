import env from '../env';

const config = {
  develop: {
    apiUrl: 'http://localhost:8080/api/',
    apiUrlWeather:
      'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=96dd3ad792ad0bba90c7443339de8e34',
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

export default configEnv();
