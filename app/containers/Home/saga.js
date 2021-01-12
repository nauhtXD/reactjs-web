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

export function* getSubCategoryByCIDSaga({ payload }) {
  try {
    const response = yield call(api.getSubCategoriesByCID, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_SUB_CATEGORY_BY_CID_SUCCESS,
        subCategoriesByCID: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_SUB_CATEGORY_BY_CID_FAIL,
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
      type: types.GET_SUB_CATEGORY_BY_CID_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getContactsSaga({ payload }) {
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

export function* createProblemSaga({ payload }) {
  try {
    const response = yield call(api.createProblem, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CREATE_PROBLEM_SUCCESS,
      });
      notification.success({
        message: 'Success',
        description: 'Đã tiếp nhận báo cáo',
      });
    } else {
      yield put({
        type: types.CREATE_PROBLEM_FAIL,
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
      type: types.CREATE_PROBLEM_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getLastestDocumentSaga({ payload }) {
  try {
    const response = yield call(api.getLastestDocuments, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_LASTEST_DOCUMENT_SUCCESS,
        lastestDocuments: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_LASTEST_DOCUMENT_FAIL,
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
      type: types.GET_LASTEST_DOCUMENT_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getWeatherSaga({ payload }) {
  try {
    const response = yield call(api.getWeathers, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_WEATHER_SUCCESS,
        weathers: response.data.list,
      });
    } else {
      yield put({
        type: types.GET_WEATHER_FAIL,
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
      type: types.GET_WEATHER_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

export function* getCityListSaga({ payload }) {
  try {
    const response = yield call(api.getCityList, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.GET_CITY_LIST_SUCCESS,
        cityList: response.data.data,
      });
    } else {
      yield put({
        type: types.GET_CITY_LIST_FAIL,
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
      type: types.GET_CITY_LIST_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

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
      type: types.GET_LOGIN_TOKEN_FAIL,
      error: err,
    });
    notification.error({
      message: 'Error',
      description: err,
    });
  }
}

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

export function* checkTokenSaga({ payload }) {
  try {
    const response = yield call(api.checkToken, payload);
    if (response && response.status === 200) {
      yield put({
        type: types.CHECK_TOKEN_SUCCESS,
        checkToken: response.data.data,
      });
    } else {
      yield put({
        type: types.CHECK_TOKEN_FAIL,
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
      type: types.CHECK_TOKEN_FAIL,
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
    takeLatest(types.GET_CONTACT, getContactsSaga),
    takeLatest(types.GET_LASTEST_POST, getLastestPostSaga),
    takeLatest(types.CREATE_PROBLEM, createProblemSaga),
    takeLatest(types.GET_LASTEST_DOCUMENT, getLastestDocumentSaga),
    takeLatest(types.GET_SUB_CATEGORY_BY_CID, getSubCategoryByCIDSaga),
    takeLatest(types.GET_WEATHER, getWeatherSaga),
    takeLatest(types.GET_CITY_LIST, getCityListSaga),
    takeLatest(types.GET_LOGIN_TOKEN, getLoginTokenSaga),
    takeLatest(types.GET_BANNER, getBannerSaga),
    takeLatest(types.CHECK_TOKEN, checkTokenSaga),
  ]);
}
