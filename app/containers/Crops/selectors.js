import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crops state domain
 */

const selectCropsDomain = state => state.crops || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Crops
 */

const makeSelectCrops = () =>
  createSelector(
    selectCropsDomain,
    substate => substate,
  );

export default makeSelectCrops;
export { selectCropsDomain };
