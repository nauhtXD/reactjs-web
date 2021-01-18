import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/Garden';
import { notification } from 'antd';
import * as types from './constants';

export function* getEpidemicSaga({ payload }) {
  try {
    const response = yield call(api.getEpidemics, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_EPIDEMIC_SUCCESS,
        epidemics: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_EPIDEMIC_FAIL,
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
      type: types.GET_EPIDEMIC_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getEpidemicHistorySaga({ payload }) {
  try {
    const response = yield call(api.getEpidemicHistories, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_EPIDEMIC_HISTORY_SUCCESS,
        epidemicHistories: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_EPIDEMIC_HISTORY_FAIL,
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
      type: types.GET_EPIDEMIC_HISTORY_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* createEpidemicHistorySaga({ payload }) {
  try {
    const response = yield call(api.createEpidemicHistory, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_EPIDEMIC_HISTORY_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Thêm thành công',
      });
    } else {
      yield put({
        type: types.CREATE_EPIDEMIC_HISTORY_FAIL,
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
      type: types.CREATE_EPIDEMIC_HISTORY_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* updateEpidemicHistorySaga({ payload }) {
  try {
    const response = yield call(api.updateEpidemicHistory, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_EPIDEMIC_HISTORY_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Cập nhật thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_EPIDEMIC_HISTORY_FAIL,
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
      type: types.UPDATE_EPIDEMIC_HISTORY_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getPlantSaga({ payload }) {
  try {
    const response = yield call(api.getPlants, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_PLANT_SUCCESS,
        plants: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_PLANT_FAIL,
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
      type: types.GET_PLANT_FAIL,
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
    takeLatest(types.GET_EPIDEMIC, getEpidemicSaga),
    takeLatest(types.GET_EPIDEMIC_HISTORY, getEpidemicHistorySaga),
    takeLatest(types.UPDATE_EPIDEMIC_HISTORY, updateEpidemicHistorySaga),
    takeLatest(types.CREATE_EPIDEMIC_HISTORY, createEpidemicHistorySaga),
    takeLatest(types.GET_PLANT, getPlantSaga),
  ]);
}
