import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/Home';
import { notification } from 'antd';
import * as types from './constants';

export function* getCategorySaga({ payload }) {
  try {
    const response = yield call(api.getCategories, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_CATEGORY_SUCCESS,
        categories: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_CATEGORY_FAIL,
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
      type: types.GET_CATEGORY_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getSubCategorySaga({ payload }) {
  try {
    const response = yield call(api.getSubCategories, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_SUB_CATEGORY_SUCCESS,
        subCategories: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_SUB_CATEGORY_FAIL,
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
      type: types.GET_SUB_CATEGORY_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getHeadquartersContactSaga({ payload }) {
  try {
    const response = yield call(api.getHeadquarters, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_HEADQUARTERS_CONTACT_SUCCESS,
        headquarters: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_HEADQUARTERS_CONTACT_FAIL,
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
      type: types.GET_HEADQUARTERS_CONTACT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getMarkSaga({ payload }) {
  try {
    const response = yield call(api.getMarks, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_MARK_SUCCESS,
        marks: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_MARK_FAIL,
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
      type: types.GET_MARK_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getLastestPostSaga({ payload }) {
  try {
    const response = yield call(api.getLastestPosts, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_LASTEST_POST_SUCCESS,
        lastestPosts: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_LASTEST_POST_FAIL,
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
      type: types.GET_LASTEST_POST_FAIL,
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
    takeLatest(types.GET_CATEGORY, getCategorySaga),
    takeLatest(types.GET_SUB_CATEGORY, getSubCategorySaga),
    takeLatest(types.GET_HEADQUARTERS_CONTACT, getHeadquartersContactSaga),
    takeLatest(types.GET_MARK, getMarkSaga),
    takeLatest(types.GET_LASTEST_POST, getLastestPostSaga),
  ]);
}
