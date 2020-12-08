import axios from 'axios';
import EnvConfigs from './envConfig';
import { getCookie } from './common';
class AxiosService {
  constructor() {
    const instance = axios.create({
      baseURL: EnvConfigs.apiUrlWeather,
      timeout: 60000,
    });
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    // instance.defaults.headers = {
    //   'Cache-Control': 'no-cache',
    //   Pragma: 'no-cache',
    //   Expires: '0',
    // };
    instance.interceptors.request.use(
      config => {
        // eslint-disable-next-line no-param-reassign
        if (getCookie('BPA')) config.headers.token = getCookie('BPA');
        return config;
      },
      error => Promise.reject(error),
    );
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess = response => response;

  // eslint-disable-next-line consistent-return
  handleError = error => {
    if (error.response) {
      return error.response;
    }
    // Swal.fire('Error', 'API Error', 'error');
    Promise.reject(error);
  };

  get = url => this.instance.get(url);

  post = (url, body) => this.instance.post(url, body);

  put = (url, body) => this.instance.put(url, body);

  delete = url => this.instance.delete(url);
}

export default new AxiosService();
