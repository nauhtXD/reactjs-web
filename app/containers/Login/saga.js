import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/Login';
import { notification } from 'antd';
import * as types from './constants';

export function* getLoginTokenSaga({ payload }) {
  try {
    const response = yield call(api.getLoginToken, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_LOGIN_TOKEN_SUCCESS,
        loginToken: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_LOGIN_TOKEN_FAIL,
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
      type: types.GET_LOGIN_TOKEN_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.GET_LOGIN_TOKEN, getLoginTokenSaga)]);
}
