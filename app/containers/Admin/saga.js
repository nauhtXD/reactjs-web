import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/Admin';
import { notification } from 'antd';
import * as types from './constants';

// #region user
export function* getUserSaga({ payload }) {
  try {
    const response = yield call(api.getUsers, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_USER_SUCCESS,
        users: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_USER_FAIL,
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
      type: types.GET_USER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* createUserSaga({ payload }) {
  try {
    const response = yield call(api.createUser, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_USER_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Thêm thành công',
      });
    } else {
      yield put({
        type: types.CREATE_USER_FAIL,
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
      type: types.CREATE_USER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* updateUserSaga({ payload }) {
  try {
    const response = yield call(api.updateUser, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_USER_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Chỉnh sửa thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_USER_FAIL,
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
      type: types.UPDATE_USER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* deleteUserSaga({ payload }) {
  try {
    const response = yield call(api.deleteUser, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.DELETE_USER_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Xóa thành công',
      });
    } else {
      yield put({
        type: types.DELETE_USER_FAIL,
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
      type: types.DELETE_USER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

// #endregion

export function* getUserTypeSaga({ payload }) {
  try {
    const response = yield call(api.getUserTypes, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_USER_TYPE_SUCCESS,
        userTypes: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_USER_TYPE_FAIL,
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
      type: types.GET_USER_TYPE_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* createPostSaga({ payload }) {
  try {
    const response = yield call(api.createPost, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_POST_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Đăng bài thành công',
      });
    } else {
      yield put({
        type: types.CREATE_POST_FAIL,
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
      type: types.CREATE_POST_FAIL,
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

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_USER, getUserSaga),
    takeLatest(types.CREATE_USER, createUserSaga),
    takeLatest(types.UPDATE_USER, updateUserSaga),
    takeLatest(types.DELETE_USER, deleteUserSaga),
    takeLatest(types.GET_USER_TYPE, getUserTypeSaga),
    takeLatest(types.CREATE_POST, createPostSaga),
    takeLatest(types.GET_SUB_CATEGORY, getSubCategorySaga),
  ]);
}
