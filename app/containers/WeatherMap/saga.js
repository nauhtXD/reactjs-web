import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/WeatherMap';
import { notification } from 'antd';
import * as types from './constants';

export function* getPosGeoSaga({ payload }) {
  try {
    const response = yield call(api.getPosGeo, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_POS_GEO_SUCCESS,
        posgeo: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_POS_GEO_FAIL,
        error: response && response.data ? response.data.message : 'API Error',
      });
      notification.error({
        message: 'Error',
        description:
          response && response.data ? response.data.message : 'API Error',
      });
    }
  } catch (err) {
    yield put({
      type: types.GET_POS_GEO_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* countEpidemicSaga({ payload }) {
  try {
    const response = yield call(api.countEpidemics, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.COUNT_EPIDEMIC_SUCCESS,
        countEpidemics: response.data.data,
      });
    } else {
      yield put({
        type: types.COUNT_EPIDEMIC_FAIL,
        error: response && response.data ? response.data.message : 'API Error',
      });
      notification.error({
        message: 'Error',
        description:
          response && response.data ? response.data.message : 'API Error',
      });
    }
  } catch (err) {
    yield put({
      type: types.COUNT_EPIDEMIC_FAIL,
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
    takeLatest(types.GET_POS_GEO, getPosGeoSaga),
    takeLatest(types.COUNT_EPIDEMIC, countEpidemicSaga),
  ]);
}
