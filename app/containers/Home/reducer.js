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
    }
  });
export default homeReducer;
