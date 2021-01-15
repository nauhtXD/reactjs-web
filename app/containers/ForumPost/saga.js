import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/ForumPost';
import { notification } from 'antd';
import * as types from './constants';

export function* getForumCommentSaga({ payload }) {
  try {
    const response = yield call(api.getForumComments, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_FORUM_COMMENT_SUCCESS,
        forumComments: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_FORUM_COMMENT_FAIL,
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
      type: types.GET_FORUM_COMMENT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* createForumCommentSaga({ payload }) {
  try {
    const response = yield call(api.createForumComment, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_FORUM_COMMENT_SUCCESS,
      });
    } else {
      yield put({
        type: types.CREATE_FORUM_COMMENT_FAIL,
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
      type: types.CREATE_FORUM_COMMENT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getForumPostSaga({ payload }) {
  try {
    const response = yield call(api.getForumPost, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_FORUM_POST_SUCCESS,
        forumPost: response.data.data,
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

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_FORUM_COMMENT, getForumCommentSaga),
    takeLatest(types.CREATE_FORUM_COMMENT, createForumCommentSaga),
    takeLatest(types.GET_FORUM_POST, getForumPostSaga),
  ]);
}
