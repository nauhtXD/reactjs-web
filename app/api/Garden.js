/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';

export const getEpidemics = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_EPIDEMIC);

export const getEpidemicHistories = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_EPIDEMIC_HISTORY_BY_UID}/${data}`);
export const createEpidemicHistory = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_EPIDEMIC_HISTORY, data);
export const updateEpidemicHistory = data =>
  apiConfig.put(
    `${endpoint.API_ENDPOINT_UPDATE_EPIDEMIC_HISTORY}/${data.plantId}/${
      data.epidemicId
    }`,
    data,
  );

export const getPlants = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_PLANT_BY_UID}/${data}`);
