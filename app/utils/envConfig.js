import env from '../env';

const config = {
  develop: {
    apiUrl: 'https://hqndapi.herokuapp.com/api/',
    apiUrlMinio: 'https://hqndminio.herokuapp.com/',
    apiUrlWeather: 'https://api.openweathermap.org/data/2.5/',
    envTag: 'd',
  },
  staging: {
    apiUrl: 'https://hqndapi.herokuapp.com/api/',
    apiUrlMinio: 'https://hqndminio.herokuapp.com/',
    apiUrlWeather: 'https://api.openweathermap.org/data/2.5/',
  },
  uat: {
    apiUrl: 'https://hqndapi.herokuapp.com/api/',
    apiUrlMinio: 'https://hqndminio.herokuapp.com/',
    apiUrlWeather: 'https://api.openweathermap.org/data/2.5/',
    envTag: 'u',
  },
  production: {
    apiUrl: 'https://hqndapi.herokuapp.com/api/',
    apiUrlMinio: 'https://hqndminio.herokuapp.com/',
    apiUrlWeather: 'https://api.openweathermap.org/data/2.5/',
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
