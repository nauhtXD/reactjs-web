import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the garden state domain
 */

const selectGardenDomain = state => state.garden || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Garden
 */

const makeSelectGarden = () =>
  createSelector(
    selectGardenDomain,
    substate => substate,
  );

export default makeSelectGarden;
export { selectGardenDomain };
