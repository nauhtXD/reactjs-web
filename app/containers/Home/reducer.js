/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingCategories: false,
  categories: [],
  loadingSubCategories: false,
  subCategories: [],
  loadingContacts: false,
  contacts: [],
  loadingMarks: false,
  marks: [],
  loadingLastestPosts: false,
  lastestPosts: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
      case types.GET_MARK:
        draft.loadingMarks = true;
        break;
      case types.GET_MARK_SUCCESS:
        draft.marks = action.marks;
        draft.loadingMarks = false;
        break;
      case types.GET_MARK_FAIL:
        draft.marks = [];
        draft.loadingMarks = false;
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
    }
  });
export default homeReducer;
