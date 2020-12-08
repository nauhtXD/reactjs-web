import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingWeather: false,
  weather: [],
};

/* eslint-disable default-case, no-param-reassign */
const weatherMapReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_WEATHER:
        draft.loadingWeather = true;
        break;
      case types.GET_WEATHER_SUCCESS:
        draft.loadingWeather = false;
        draft.weather = action.weather;
        break;
      case types.GET_WEATHER_FAIL:
        draft.loadingWeather = false;
        draft.weather = [];
        break;
    }
  });

export default weatherMapReducer;
