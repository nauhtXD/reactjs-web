import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documents state domain
 */

const selectDocumentsDomain = state => state.documents || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Documents
 */

const makeSelectDocuments = () =>
  createSelector(
    selectDocumentsDomain,
    substate => substate,
  );

export default makeSelectDocuments;
export { selectDocumentsDomain };
