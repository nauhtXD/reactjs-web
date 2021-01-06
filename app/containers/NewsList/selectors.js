import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newsList state domain
 */

const selectNewsListDomain = state => state.newsList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewsList
 */

const makeSelectNewsList = () =>
  createSelector(
    selectNewsListDomain,
    substate => substate,
  );

export default makeSelectNewsList;
export { selectNewsListDomain };
