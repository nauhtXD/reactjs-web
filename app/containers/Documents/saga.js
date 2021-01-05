import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/Documents';
import { notification } from 'antd';
import * as types from './constants';

export default function* rootSaga() {
  //   yield all([takeLatest(types.DEFAULT_ACTION, getDocumentsSaga)]);
}
