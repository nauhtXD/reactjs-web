import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingWeathers: false,
  weathers: [],
  loadingCityList: false,
  cityList: [],
  loadingPosGeo: false,
  posgeo: [],
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
      case types.GET_POS_GEO:
        draft.loadingPosGeo = true;
        break;
      case types.GET_POS_GEO_SUCCESS:
        draft.loadingPosGeo = false;
        draft.posgeo = action.posgeo;
        break;
      case types.GET_POS_GEO_FAIL:
        draft.loadingPosGeo = false;
        draft.posgeo = [];
        break;
    }
  });

export default weatherMapReducer;
