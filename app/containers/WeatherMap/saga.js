import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/WeatherMap';
import { notification } from 'antd';
import * as types from './constants';

export function* getWeatherSaga({ payload }) {
  try {
    const response = yield call(api.getWeathers, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_WEATHER_SUCCESS,
        weathers: response.data.list,
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

export function* getContactSaga({ payload }) {
  try {
    const response = yield call(api.getContacts, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_CONTACT_SUCCESS,
        contacts: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_CONTACT_FAIL,
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
      type: types.GET_CONTACT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getCityListSaga({ payload }) {
  try {
    const response = yield call(api.getCityList, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_CITY_LIST_SUCCESS,
        cityList: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_CITY_LIST_FAIL,
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
      type: types.GET_CITY_LIST_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_WEATHER, getWeatherSaga),
    takeLatest(types.GET_CONTACT, getContactSaga),
    takeLatest(types.GET_CITY_LIST, getCityListSaga),
  ]);
}
