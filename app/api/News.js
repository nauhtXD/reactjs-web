import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const api = data => apiConfig.post(endpoint.API_ENDPOINT_GET_POST, data);
