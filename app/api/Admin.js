import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getUsers = () => apiConfig.get(endpoint.API_ENDPOINT_GET_USER);
