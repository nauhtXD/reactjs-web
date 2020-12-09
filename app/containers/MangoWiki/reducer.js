import produce from 'immer';
import * as types from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const mangoWikiReducer = (state = initialState, action) =>
  produce(state, draft => {});

export default mangoWikiReducer;
