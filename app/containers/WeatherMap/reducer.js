import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingPosGeo: false,
  posgeo: [],
};

/* eslint-disable default-case, no-param-reassign */
const weatherMapReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_POS_GEO:
        draft.loadingPosGeo = true;
        break;
      case types.GET_POS_GEO_SUCCESS:
        draft.loadingPosGeo = false;
        draft.posgeo = action.posgeo;
        break;
      case types.GET_POS_GEO_FAIL:
        draft.loadingPosGeo = false;
        draft.posgeo = [];
        break;
    }
  });

export default weatherMapReducer;
