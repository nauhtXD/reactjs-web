import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forum state domain
 */

const selectForumDomain = state => state.forum || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Forum
 */

const makeSelectForum = () =>
  createSelector(
    selectForumDomain,
    substate => substate,
  );

export default makeSelectForum;
export { selectForumDomain };
