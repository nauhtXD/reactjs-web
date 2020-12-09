import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mangoWiki state domain
 */

const selectMangoWikiDomain = state => state.mangoWiki || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MangoWiki
 */

const makeSelectMangoWiki = () =>
  createSelector(
    selectMangoWikiDomain,
    substate => substate,
  );

export default makeSelectMangoWiki;
export { selectMangoWikiDomain };
