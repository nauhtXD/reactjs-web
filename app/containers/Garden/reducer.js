import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingEpidemics: false,
  epidemics: [],
  loadingEpidemicHistories: false,
  epidemicHistories: [],
  loadingPlants: false,
  plants: [],
  loadingGenusFeatures: false,
  genusFeatures: [],
  loadingHousehold: false,
  household: [],
};

/* eslint-disable default-case, no-param-reassign */
const gardenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_EPIDEMIC:
        draft.loadingEpidemics = true;
        break;
      case types.GET_EPIDEMIC_SUCCESS:
        draft.loadingEpidemics = false;
        draft.epidemics = action.epidemics;
        break;
      case types.GET_EPIDEMIC_FAIL:
        draft.loadingEpidemics = false;
        draft.epidemics = [];
        break;
      case types.GET_EPIDEMIC_HISTORY:
        draft.loadingEpidemicHistories = true;
        break;
      case types.GET_EPIDEMIC_HISTORY_SUCCESS:
        draft.loadingEpidemicHistories = false;
        draft.epidemicHistories = action.epidemicHistories;
        break;
      case types.GET_EPIDEMIC_HISTORY_FAIL:
        draft.loadingEpidemicHistories = false;
        draft.epidemicHistories = [];
        break;
      case types.GET_PLANT:
        draft.loadingPlants = true;
        break;
      case types.GET_PLANT_SUCCESS:
        draft.loadingPlants = false;
        draft.plants = action.plants;
        break;
      case types.GET_PLANT_FAIL:
        draft.loadingPlants = false;
        draft.plants = [];
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
      case types.GET_HOUSEHOLD:
        draft.loadingHousehold = true;
        break;
      case types.GET_HOUSEHOLD_SUCCESS:
        draft.household = action.household;
        draft.loadingHousehold = false;
        break;
      case types.GET_HOUSEHOLD_FAIL:
        draft.household = [];
        draft.loadingHousehold = false;
        break;
    }
  });

export default gardenReducer;
