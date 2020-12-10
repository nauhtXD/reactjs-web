import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/MangoWiki';
import { notification } from 'antd';
import * as types from './constants';

export function* getFamilySaga({ payload }) {
  try {
    const response = yield call(api.getFamilies, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_FAMILY_SUCCESS,
        families: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_FAMILY_FAIL,
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
      type: types.GET_FAMILY_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getGenusSaga({ payload }) {
  try {
    const response = yield call(api.getGenera, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_GENUS_SUCCESS,
        genera: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_GENUS_FAIL,
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
      type: types.GET_GENUS_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getGenusFeatureSaga({ payload }) {
  try {
    const response = yield call(api.getGenusFeatures, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_GENUS_FEATURE_SUCCESS,
        genusFeatures: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_GENUS_FEATURE_FAIL,
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
      type: types.GET_GENUS_FEATURE_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getNewSaga({ payload }) {
  try {
    const response = yield call(api.getNew, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_NEW_SUCCESS,
        new: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_NEW_FAIL,
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
      type: types.GET_NEW_FAIL,
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
    takeLatest(types.GET_FAMILY, getFamilySaga),
    takeLatest(types.GET_GENUS, getGenusSaga),
    takeLatest(types.GET_GENUS_FEATURE, getGenusFeatureSaga),
    takeLatest(types.GET_NEW, getNewSaga),
  ]);
}
