import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingFamilies: false,
  families: [],
  loadingGenera: false,
  genera: [],
  loadingGenusFeatures: false,
  genusFeatures: [],
  loadingNew: false,
  new: [],
};

/* eslint-disable default-case, no-param-reassign */
const mangoWikiReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_FAMILY:
        draft.loadingFamilies = true;
        break;
      case types.GET_FAMILY_SUCCESS:
        draft.families = action.families;
        draft.loadingFamilies = false;
        break;
      case types.GET_FAMILY_FAIL:
        draft.families = [];
        draft.loadingFamilies = false;
        break;
      case types.GET_GENUS:
        draft.loadingGenera = true;
        break;
      case types.GET_GENUS_SUCCESS:
        draft.genera = action.genera;
        draft.loadingGenera = false;
        break;
      case types.GET_GENUS_FAIL:
        draft.genera = [];
        draft.loadingGenera = false;
        break;
      case types.GET_GENUS_FEATURE:
        draft.loadingGenusFeatures = true;
        break;
      case types.GET_GENUS_FEATURE_SUCCESS:
        draft.genusFeatures = action.genusFeatures;
        draft.loadingGenusFeatures = false;
        break;
      case types.GET_GENUS_FEATURE_FAIL:
        draft.genusFeatures = [];
        draft.loadingGenusFeatures = false;
        break;
      case types.GET_NEW:
        draft.loadingNew = true;
        break;
      case types.GET_NEW_SUCCESS:
        draft.new = action.new;
        draft.loadingNew = false;
        break;
      case types.GET_NEW_FAIL:
        draft.new = [];
        draft.loadingNew = false;
        break;
    }
  });

export default mangoWikiReducer;
