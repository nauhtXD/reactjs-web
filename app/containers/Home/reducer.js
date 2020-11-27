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
    }
  });
export default homeReducer;
