import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/Documents';
import { notification } from 'antd';
import * as types from './constants';

export function* getDocumentSaga({ payload }) {
  try {
    const response = yield call(api.getDocuments, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_DOCUMENT_SUCCESS,
        documents: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_DOCUMENT_FAIL,
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
      type: types.GET_DOCUMENT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getInformationSaga({ payload }) {
  try {
    const response = yield call(api.getInformation, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_DOCUMENT_INFORMATION_SUCCESS,
        information: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_DOCUMENT_INFORMATION_FAIL,
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
      type: types.GET_DOCUMENT_INFORMATION_FAIL,
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
    takeLatest(types.GET_DOCUMENT, getDocumentSaga),
    takeLatest(types.GET_DOCUMENT_INFORMATION, getInformationSaga),
  ]);
}
