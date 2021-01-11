import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingPosGeo: false,
  posgeo: [],
  loadingCountEpidemics: false,
  countEpidemics: [],
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
      case types.COUNT_EPIDEMIC:
        draft.loadingCountEpidemics = true;
        break;
      case types.COUNT_EPIDEMIC_SUCCESS:
        draft.loadingCountEpidemics = false;
        draft.countEpidemics = action.countEpidemics;
        break;
      case types.COUNT_EPIDEMIC_FAIL:
        draft.loadingCountEpidemics = false;
        draft.countEpidemics = [];
        break;
    }
  });

export default weatherMapReducer;
