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

// #endregion

// #region post
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

export function* getPostSaga({ payload }) {
  try {
    const response = yield call(api.getPosts, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_POST_SUCCESS,
        posts: response.data.data,
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

export function* updatePostSaga({ payload }) {
  try {
    const response = yield call(api.updatePost, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_POST_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Chỉnh sửa thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_POST_FAIL,
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
      type: types.UPDATE_POST_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* deletePostSaga({ payload }) {
  try {
    const response = yield call(api.deletePost, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.DELETE_POST_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Xóa thành công',
      });
    } else {
      yield put({
        type: types.DELETE_POST_FAIL,
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
      type: types.DELETE_POST_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}
// #endregion

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

export function* getStatusSaga({ payload }) {
  try {
    const response = yield call(api.getStatuses, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_STATUS_SUCCESS,
        statuses: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_STATUS_FAIL,
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
      type: types.GET_STATUS_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

// #region problem
export function* getProblemSaga({ payload }) {
  try {
    const response = yield call(api.getProblems, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_PROBLEM_SUCCESS,
        problems: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_PROBLEM_FAIL,
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
      type: types.GET_PROBLEM_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* updateProblemSaga({ payload }) {
  try {
    const response = yield call(api.updateProblem, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_PROBLEM_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Chỉnh sửa thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_PROBLEM_FAIL,
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
      type: types.UPDATE_PROBLEM_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* deleteProblemSaga({ payload }) {
  try {
    const response = yield call(api.deleteProblem, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.DELETE_PROBLEM_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Xóa thành công',
      });
    } else {
      yield put({
        type: types.DELETE_PROBLEM_FAIL,
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
      type: types.DELETE_PROBLEM_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}
// #endregion

export function* getProvinceSaga({ payload }) {
  try {
    const response = yield call(api.getProvinces, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_PROVINCE_SUCCESS,
        provinces: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_PROVINCE_FAIL,
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
      type: types.GET_PROVINCE_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getCenterSaga({ payload }) {
  try {
    const response = yield call(api.getCenter, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_CENTER_SUCCESS,
        center: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_CENTER_FAIL,
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
      type: types.GET_CENTER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

// #region contact
export function* getContactSaga({ payload }) {
  try {
    const response = yield call(api.getContacts, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_CONTACT_SUCCESS,
        contacts: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_CONTACT_FAIL,
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
      type: types.GET_CONTACT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* createContactSaga({ payload }) {
  try {
    const response = yield call(api.createContact, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_CONTACT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Thêm thành công',
      });
    } else {
      yield put({
        type: types.CREATE_CONTACT_FAIL,
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
      type: types.CREATE_CONTACT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* updateContactSaga({ payload }) {
  try {
    const response = yield call(api.updateContact, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_CONTACT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Chỉnh sửa thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_CONTACT_FAIL,
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
      type: types.UPDATE_CONTACT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* deleteContactSaga({ payload }) {
  try {
    const response = yield call(api.deleteContact, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.DELETE_CONTACT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Xóa thành công',
      });
    } else {
      yield put({
        type: types.DELETE_CONTACT_FAIL,
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
      type: types.DELETE_CONTACT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}
// #endregion

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_USER, getUserSaga),
    takeLatest(types.CREATE_USER, createUserSaga),
    takeLatest(types.UPDATE_USER, updateUserSaga),
    takeLatest(types.DELETE_USER, deleteUserSaga),
    takeLatest(types.GET_USER_TYPE, getUserTypeSaga),
    takeLatest(types.CREATE_POST, createPostSaga),
    takeLatest(types.GET_POST, getPostSaga),
    takeLatest(types.UPDATE_POST, updatePostSaga),
    takeLatest(types.DELETE_POST, deletePostSaga),
    takeLatest(types.GET_SUB_CATEGORY, getSubCategorySaga),
    takeLatest(types.GET_STATUS, getStatusSaga),
    takeLatest(types.GET_PROBLEM, getProblemSaga),
    takeLatest(types.UPDATE_PROBLEM, updateProblemSaga),
    takeLatest(types.DELETE_PROBLEM, deleteProblemSaga),
    takeLatest(types.GET_PROVINCE, getProvinceSaga),
    takeLatest(types.GET_CENTER, getCenterSaga),
    takeLatest(types.GET_CONTACT, getContactSaga),
    takeLatest(types.CREATE_CONTACT, createContactSaga),
    takeLatest(types.UPDATE_CONTACT, updateContactSaga),
    takeLatest(types.DELETE_CONTACT, deleteContactSaga),
  ]);
}
