import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forumPost state domain
 */

const selectForumPostDomain = state => state.forumPost || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ForumPost
 */

const makeSelectForumPost = () =>
  createSelector(
    selectForumPostDomain,
    substate => substate,
  );

export default makeSelectForumPost;
export { selectForumPostDomain };
