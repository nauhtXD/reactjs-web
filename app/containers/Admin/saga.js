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

export function* countPostSaga({ payload }) {
  try {
    const response = yield call(api.countPosts, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.COUNT_POST_SUCCESS,
        countPosts: response.data.data,
      });
    } else {
      yield put({
        type: types.COUNT_POST_FAIL,
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
      type: types.COUNT_POST_FAIL,
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

export function* countProblemSaga({ payload }) {
  try {
    const response = yield call(api.countProblems, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.COUNT_PROBLEM_SUCCESS,
        countProblems: response.data.data,
      });
    } else {
      yield put({
        type: types.COUNT_PROBLEM_FAIL,
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
      type: types.COUNT_PROBLEM_FAIL,
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

export function* uploadImgSaga({ payload }) {
  try {
    const response = yield call(api.uploadImg, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPLOAD_IMG_SUCCESS,
        url: response.data.data,
      });
    } else {
      yield put({
        type: types.UPLOAD_IMG_FAIL,
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
      type: types.UPLOAD_IMG_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* uploadPdfSaga({ payload }) {
  try {
    const response = yield call(api.uploadPdf, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPLOAD_PDF_SUCCESS,
        url: response.data.data,
      });
    } else {
      yield put({
        type: types.UPLOAD_PDF_FAIL,
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
      type: types.UPLOAD_PDF_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getLandSaga({ payload }) {
  try {
    const response = yield call(api.getLands, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_LAND_SUCCESS,
        lands: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_LAND_FAIL,
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
      type: types.GET_LAND_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

// #region household
export function* getHouseholdSaga({ payload }) {
  try {
    const response = yield call(api.getHouseholds, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_HOUSEHOLD_SUCCESS,
        households: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_HOUSEHOLD_FAIL,
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
      type: types.GET_HOUSEHOLD_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* countHouseholdSaga({ payload }) {
  try {
    const response = yield call(api.countHouseholds, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.COUNT_HOUSEHOLD_SUCCESS,
        countHouseholds: response.data.data,
      });
    } else {
      yield put({
        type: types.COUNT_HOUSEHOLD_FAIL,
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
      type: types.COUNT_HOUSEHOLD_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* createHouseholdSaga({ payload }) {
  try {
    const response = yield call(api.createHousehold, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_HOUSEHOLD_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Thêm thành công',
      });
    } else {
      yield put({
        type: types.CREATE_HOUSEHOLD_FAIL,
        error: response && response.data ? response.data.messages : 'API Error',
      });
      notification.error({
        message: 'Error',
        description:
          response && response.data
            ? response.data.errors[0].message
            : 'API Error',
      });
    }
  } catch (err) {
    yield put({
      type: types.CREATE_HOUSEHOLD_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* updateHouseholdSaga({ payload }) {
  try {
    const response = yield call(api.updateHousehold, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_HOUSEHOLD_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Chỉnh sửa thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_HOUSEHOLD_FAIL,
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
      type: types.UPDATE_HOUSEHOLD_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* deleteHouseholdSaga({ payload }) {
  try {
    const response = yield call(api.deleteHousehold, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.DELETE_HOUSEHOLD_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Xóa thành công',
      });
    } else {
      yield put({
        type: types.DELETE_HOUSEHOLD_FAIL,
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
      type: types.DELETE_HOUSEHOLD_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}
// #endregion

// #region plant
export function* getPlantSaga({ payload }) {
  try {
    const response = yield call(api.getPlants, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_PLANT_SUCCESS,
        plants: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_PLANT_FAIL,
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
      type: types.GET_PLANT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* createPlantSaga({ payload }) {
  try {
    const response = yield call(api.createPlant, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_PLANT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Thêm thành công',
      });
    } else {
      yield put({
        type: types.CREATE_PLANT_FAIL,
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
      type: types.CREATE_PLANT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* updatePlantSaga({ payload }) {
  try {
    const response = yield call(api.updatePlant, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_PLANT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Chỉnh sửa thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_PLANT_FAIL,
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
      type: types.UPDATE_PLANT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* deletePlantSaga({ payload }) {
  try {
    const response = yield call(api.deletePlant, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.DELETE_PLANT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Xóa thành công',
      });
    } else {
      yield put({
        type: types.DELETE_PLANT_FAIL,
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
      type: types.DELETE_PLANT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}
// #endregion

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

// #region banner
export function* getBannerSaga({ payload }) {
  try {
    const response = yield call(api.getBanners, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_BANNER_SUCCESS,
        banners: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_BANNER_FAIL,
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
      type: types.GET_BANNER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* updateBannerSaga({ payload }) {
  try {
    const response = yield call(api.updateBanner, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_BANNER_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Chỉnh sửa thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_BANNER_FAIL,
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
      type: types.UPDATE_BANNER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}
// #endregion

// #region document
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

export function* createDocumentSaga({ payload }) {
  try {
    const response = yield call(api.createDocument, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_DOCUMENT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Thêm thành công',
      });
    } else {
      yield put({
        type: types.CREATE_DOCUMENT_FAIL,
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
      type: types.CREATE_DOCUMENT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* updateDocumentSaga({ payload }) {
  try {
    const response = yield call(api.updateDocument, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.UPDATE_DOCUMENT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Chỉnh sửa thành công',
      });
    } else {
      yield put({
        type: types.UPDATE_DOCUMENT_FAIL,
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
      type: types.UPDATE_DOCUMENT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* deleteDocumentSaga({ payload }) {
  try {
    const response = yield call(api.deleteDocument, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.DELETE_DOCUMENT_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Xóa thành công',
      });
    } else {
      yield put({
        type: types.DELETE_DOCUMENT_FAIL,
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
      type: types.DELETE_DOCUMENT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}
// #endregion

// #region documentType
export function* getDocumentTypeSaga({ payload }) {
  try {
    const response = yield call(api.getDocumentTypes, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_DOCUMENT_TYPE_SUCCESS,
        documentTypes: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_DOCUMENT_TYPE_FAIL,
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
      type: types.GET_DOCUMENT_TYPE_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}
// #endregion

// #region field
export function* getFieldSaga({ payload }) {
  try {
    const response = yield call(api.getFields, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_FIELD_SUCCESS,
        fields: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_FIELD_FAIL,
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
      type: types.GET_FIELD_FAIL,
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
    takeLatest(types.UPLOAD_IMG, uploadImgSaga),
    takeLatest(types.UPLOAD_PDF, uploadPdfSaga),
    takeLatest(types.GET_HOUSEHOLD, getHouseholdSaga),
    takeLatest(types.CREATE_HOUSEHOLD, createHouseholdSaga),
    takeLatest(types.UPDATE_HOUSEHOLD, updateHouseholdSaga),
    takeLatest(types.DELETE_HOUSEHOLD, deleteHouseholdSaga),
    takeLatest(types.GET_LAND, getLandSaga),
    takeLatest(types.GET_PLANT, getPlantSaga),
    takeLatest(types.CREATE_PLANT, createPlantSaga),
    takeLatest(types.UPDATE_PLANT, updatePlantSaga),
    takeLatest(types.DELETE_PLANT, deletePlantSaga),
    takeLatest(types.GET_GENUS_FEATURE, getGenusFeatureSaga),
    takeLatest(types.GET_BANNER, getBannerSaga),
    takeLatest(types.UPDATE_BANNER, updateBannerSaga),
    takeLatest(types.GET_DOCUMENT, getDocumentSaga),
    takeLatest(types.CREATE_DOCUMENT, createDocumentSaga),
    takeLatest(types.UPDATE_DOCUMENT, updateDocumentSaga),
    takeLatest(types.DELETE_DOCUMENT, deleteDocumentSaga),
    takeLatest(types.GET_DOCUMENT_TYPE, getDocumentTypeSaga),
    takeLatest(types.GET_FIELD, getFieldSaga),
    takeLatest(types.COUNT_POST, countPostSaga),
    takeLatest(types.COUNT_HOUSEHOLD, countHouseholdSaga),
    takeLatest(types.COUNT_PROBLEM, countProblemSaga),
  ]);
}
