import produce from 'immer';
import * as types from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const documentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.DEFAULT_REQUEST:
        break;
      case types.DEFAULT_SUCCESS:
        break;
      case types.DEFAULT_FAILURE:
        break;
    }
  });

export default documentsReducer;
