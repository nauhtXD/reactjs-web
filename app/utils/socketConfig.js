import env from '../env';

const config = {
  develop: {
    apiUrl: 'https://dev-socket.vn/',
    envTag: 'd',
  },
  staging: {
    apiUrl: 'https://staging-socket.vn/',
    envTag: 's',
  },
  uat: {
    apiUrl: 'https://uat-socket.vn/',
    envTag: 'u',
  },
  production: {
    apiUrl: 'https://prod-socket.vn/',
    envTag: 'p',
  },
};
export default config[env];
