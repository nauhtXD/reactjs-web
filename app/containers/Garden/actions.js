import * as types from './constants';

export function getEpidemics(data) {
  return {
    type: types.GET_EPIDEMIC,
    payload: data,
  };
}

export function getEpidemicHistories(data) {
  return {
    type: types.GET_EPIDEMIC_HISTORY,
    payload: data,
  };
}

export function updateEpidemicHistory(data) {
  return {
    type: types.UPDATE_EPIDEMIC_HISTORY,
    payload: data,
  };
}

export function createEpidemicHistory(data) {
  return {
    type: types.CREATE_EPIDEMIC_HISTORY,
    payload: data,
  };
}

export function getPlants(data) {
  return {
    type: types.GET_PLANT,
    payload: data,
  };
}

export function createPlant(data) {
  return {
    type: types.CREATE_PLANT,
    payload: data,
  };
}

export function updatePlant(data) {
  return {
    type: types.UPDATE_PLANT,
    payload: data,
  };
}

export function deletePlant(data) {
  return {
    type: types.DELETE_PLANT,
    payload: data,
  };
}

export function getGenusFeatures(data) {
  return {
    type: types.GET_GENUS_FEATURE,
    payload: data,
  };
}

export function getHousehold(data) {
  return {
    type: types.GET_HOUSEHOLD,
    payload: data,
  };
}
