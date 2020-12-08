import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/News';
import { notification } from 'antd';
import * as types from './constants';

export function* getPostSaga({ payload }) {
  try {
    const response = yield call(api.getPost, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_POST_SUCCESS,
        post: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_POST_FAIL,
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
      type: types.GET_POST_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.GET_POST, getPostSaga)]);
}
