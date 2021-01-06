import * as types from './constants';

export function getDocuments(data) {
  return {
    type: types.GET_DOCUMENT,
    payload: data,
  };
}

export function getInformation(data) {
  return {
    type: types.GET_DOCUMENT_INFORMATION,
    payload: data,
  };
}
