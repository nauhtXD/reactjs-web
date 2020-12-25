import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingWeathers: false,
  weathers: [],
  loadingContacts: false,
  contacts: [],
  loadingCityList: false,
  cityList: [],
};

/* eslint-disable default-case, no-param-reassign */
const weatherMapReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_WEATHER:
        draft.loadingWeathers = true;
        break;
      case types.GET_WEATHER_SUCCESS:
        draft.loadingWeathers = false;
        draft.weathers = action.weathers;
        break;
      case types.GET_WEATHER_FAIL:
        draft.loadingWeathers = false;
        draft.weathers = [];
        break;
      case types.GET_CONTACT:
        draft.loadingContacts = true;
        break;
      case types.GET_CONTACT_SUCCESS:
        draft.loadingContacts = false;
        draft.contacts = action.contacts;
        break;
      case types.GET_CONTACT_FAIL:
        draft.loadingContacts = false;
        draft.contacts = [];
        break;
      case types.GET_CITY_LIST:
        draft.loadingCityList = true;
        break;
      case types.GET_CITY_LIST_SUCCESS:
        draft.loadingCityList = false;
        draft.cityList = action.cityList;
        break;
      case types.GET_CITY_LIST_FAIL:
        draft.loadingCityList = false;
        draft.cityList = [];
        break;
    }
  });

export default weatherMapReducer;
