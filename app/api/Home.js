import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CATEGORY);
