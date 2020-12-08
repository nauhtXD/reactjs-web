import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/WeatherMap';
import { notification } from 'antd';
import * as types from './constants';

export function* getWeatherSaga({ payload }) {
  try {
    const response = yield call(api.getWeather, payload);
    if (response && response.status === 200) {
      const mData = { ...response.data.weather[0], ...response.data.main };
      yield put({
        type: types.GET_WEATHER_SUCCESS,
        weather: mData,
      });
    } else {
      yield put({
        type: types.GET_WEATHER_FAIL,
        error: response && response.data ? response.data.messages : 'API Error',
      });
      notification.error({
        message: 'Error',
        description:
          response && response.data ? response.data.messages : 'API Error',
      });
    }
  } catch (err) {
    yield put({
      type: types.GET_WEATHER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.GET_WEATHER, getWeatherSaga)]);
}
