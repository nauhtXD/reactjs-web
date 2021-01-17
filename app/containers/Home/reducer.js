/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingWeathers: false,
  weathers: [],
  loadingCategories: false,
  categories: [],
  loadingSubCategories: false,
  subCategories: [],
  loadingSubCategoriesByCID: false,
  subCategoriesByCID: [],
  loadingContacts: false,
  contacts: [],
  loadingLastestPosts: false,
  lastestPosts: [],
  loadingLastestDocuments: false,
  lastestDocuments: [],
  loadingCityList: false,
  cityList: [],
  loadingLoginToken: false,
  loginToken: [],
  loadingBanners: false,
  banners: [],
  loadingCheckToken: false,
  checkToken: [],
  loadingForumPosts: false,
  forumPosts: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_CITY_LIST:
        draft.loadingCityList = true;
        break;
      case types.GET_CITY_LIST_SUCCESS:
        draft.loadingCityList = false;
        draft.cityList = action.cityList;
        break;
      case types.GET_CITY_LIST_FAIL:
        draft.loadingCityList = false;
        draft.cityList = [];
        break;
      case types.GET_WEATHER:
        draft.loadingWeathers = true;
        break;
      case types.GET_WEATHER_SUCCESS:
        draft.loadingWeathers = false;
        draft.weathers = action.weathers;
        break;
      case types.GET_WEATHER_FAIL:
        draft.loadingWeathers = false;
        draft.weathers = [];
        break;
      case types.GET_CATEGORY:
        draft.loadingCategories = true;
        break;
      case types.GET_CATEGORY_SUCCESS:
        draft.categories = action.categories;
        draft.loadingCategories = false;
        break;
      case types.GET_CATEGORY_FAIL:
        draft.categories = [];
        draft.loadingCategories = false;
        break;
      case types.GET_SUB_CATEGORY:
        draft.loadingSubCategories = true;
        break;
      case types.GET_SUB_CATEGORY_SUCCESS:
        draft.subCategories = action.subCategories;
        draft.loadingSubCategories = false;
        break;
      case types.GET_SUB_CATEGORY_FAIL:
        draft.subCategories = [];
        draft.loadingSubCategories = false;
        break;
      case types.GET_SUB_CATEGORY_BY_CID:
        draft.loadingSubCategoriesByCID = true;
        break;
      case types.GET_SUB_CATEGORY_BY_CID_SUCCESS:
        draft.subCategoriesByCID = action.subCategoriesByCID;
        draft.loadingSubCategoriesByCID = false;
        break;
      case types.GET_SUB_CATEGORY_BY_CID_FAIL:
        draft.subCategoriesByCID = [];
        draft.loadingSubCategoriesByCID = false;
        break;
      case types.GET_CONTACT:
        draft.loadingContacts = true;
        break;
      case types.GET_CONTACT_SUCCESS:
        draft.contacts = action.contacts;
        draft.loadingContacts = false;
        break;
      case types.GET_CONTACT_FAIL:
        draft.contacts = [];
        draft.loadingContacts = false;
        break;
      case types.GET_LASTEST_POST:
        draft.loadingLastestPosts = true;
        break;
      case types.GET_LASTEST_POST_SUCCESS:
        draft.lastestPosts = action.lastestPosts;
        draft.loadingLastestPosts = false;
        break;
      case types.GET_LASTEST_POST_FAIL:
        draft.lastestPosts = [];
        draft.loadingLastestPosts = false;
        break;
      case types.GET_LASTEST_DOCUMENT:
        draft.loadingLastestDocuments = true;
        break;
      case types.GET_LASTEST_DOCUMENT_SUCCESS:
        draft.lastestDocuments = action.lastestDocuments;
        draft.loadingLastestDocuments = false;
        break;
      case types.GET_LASTEST_DOCUMENT_FAIL:
        draft.lastestDocuments = [];
        draft.loadingLastestDocuments = false;
        break;
      case types.GET_LOGIN_TOKEN:
        draft.loadingLoginToken = true;
        break;
      case types.GET_LOGIN_TOKEN_SUCCESS:
        draft.loginToken = action.loginToken;
        draft.loadingLoginToken = false;
        break;
      case types.GET_LOGIN_TOKEN_FAIL:
        draft.loginToken = [];
        draft.loadingLoginToken = false;
        break;
      case types.GET_BANNER:
        draft.loadingBanners = true;
        break;
      case types.GET_BANNER_SUCCESS:
        draft.banners = action.banners;
        draft.loadingBanners = false;
        break;
      case types.GET_BANNER_FAIL:
        draft.banners = [];
        draft.loadingBanners = false;
        break;
      case types.CHECK_TOKEN:
        draft.loadingCheckToken = true;
        break;
      case types.CHECK_TOKEN_SUCCESS:
        draft.checkToken = action.checkToken;
        draft.loadingCheckToken = false;
        break;
      case types.CHECK_TOKEN_FAIL:
        draft.checkToken = [];
        draft.loadingCheckToken = false;
        break;
      case types.GET_FORUM_POST_BY_UID:
        draft.loadingForumPosts = true;
        break;
      case types.GET_FORUM_POST_BY_UID_SUCCESS:
        draft.forumPosts = action.forumPosts;
        draft.loadingForumPosts = false;
        break;
      case types.GET_FORUM_POST_BY_UID_FAIL:
        draft.forumPosts = [];
        draft.loadingForumPosts = false;
        break;
    }
  });
export default homeReducer;
