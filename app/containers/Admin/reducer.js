/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingUsers: false,
  users: [],
  loadingUserTypes: false,
  userTypes: [],
  loadingSubCategories: false,
  subCategories: [],
  loadingStatuses: false,
  statuses: [],
  loadingProblems: false,
  problems: [],
  loadingPosts: false,
  posts: [],
  loadingProvinces: false,
  provinces: [],
  loadingCenter: false,
  center: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_USER:
        draft.loadingUsers = true;
        break;
      case types.GET_USER_SUCCESS:
        draft.users = action.users;
        draft.loadingUsers = false;
        break;
      case types.GET_USER_FAIL:
        draft.users = [];
        draft.loadingUsers = false;
        break;
      case types.GET_USER_TYPE:
        draft.loadingUserTypes = true;
        break;
      case types.GET_USER_TYPE_SUCCESS:
        draft.userTypes = action.userTypes;
        draft.loadingUserTypes = false;
        break;
      case types.GET_USER_TYPE_FAIL:
        draft.userTypes = [];
        draft.loadingUserTypes = false;
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
      case types.GET_STATUS:
        draft.loadingStatuses = true;
        break;
      case types.GET_STATUS_SUCCESS:
        draft.statuses = action.statuses;
        draft.loadingStatuses = false;
        break;
      case types.GET_STATUS_FAIL:
        draft.statuses = [];
        draft.loadingStatuses = false;
        break;
      case types.GET_PROBLEM:
        draft.loadingProblems = true;
        break;
      case types.GET_PROBLEM_SUCCESS:
        draft.problems = action.problems;
        draft.loadingProblems = false;
        break;
      case types.GET_PROBLEM_FAIL:
        draft.problems = [];
        draft.loadingProblems = false;
        break;
      case types.GET_POST:
        draft.loadingPosts = true;
        break;
      case types.GET_POST_SUCCESS:
        draft.posts = action.posts;
        draft.loadingPosts = false;
        break;
      case types.GET_POST_FAIL:
        draft.posts = [];
        draft.loadingPosts = false;
        break;
      case types.GET_PROVINCE:
        draft.loadingProvinces = true;
        break;
      case types.GET_PROVINCE_SUCCESS:
        draft.provinces = action.provinces;
        draft.loadingProvinces = false;
        break;
      case types.GET_PROVINCE_FAIL:
        draft.provinces = [];
        draft.loadingProvinces = false;
        break;
      case types.GET_CENTER:
        draft.loadingCenter = true;
        break;
      case types.GET_CENTER_SUCCESS:
        draft.center = action.center;
        draft.loadingCenter = false;
        break;
      case types.GET_CENTER_FAIL:
        draft.center = [];
        draft.loadingCenter = false;
        break;
    }
  });

export default adminReducer;
