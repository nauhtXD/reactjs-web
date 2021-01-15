import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/Forum';
import { notification } from 'antd';
import * as types from './constants';

export function* getForumPostSaga({ payload }) {
  try {
    const response = yield call(api.getForumPosts, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_FORUM_POST_SUCCESS,
        forumPosts: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_FORUM_POST_FAIL,
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
      type: types.GET_FORUM_POST_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* createForumPostSaga({ payload }) {
  try {
    const response = yield call(api.createForumPost, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_FORUM_POST_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Tạo thành công',
      });
    } else {
      yield put({
        type: types.CREATE_FORUM_POST_FAIL,
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
      type: types.CREATE_FORUM_POST_FAIL,
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
    takeLatest(types.GET_FORUM_POST, getForumPostSaga),
    takeLatest(types.CREATE_FORUM_POST, createForumPostSaga),
  ]);
}
