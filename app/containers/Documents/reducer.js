import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingDocuments: false,
  documents: [],
  loadingInformation: false,
  information: [],
};

/* eslint-disable default-case, no-param-reassign */
const documentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_DOCUMENT:
        draft.loadingDocuments = true;
        break;
      case types.GET_DOCUMENT_SUCCESS:
        draft.documents = action.documents;
        draft.loadingDocuments = false;
        break;
      case types.GET_DOCUMENT_FAIL:
        draft.documents = [];
        draft.loadingDocuments = false;
        break;
      case types.GET_DOCUMENT_INFORMATION:
        draft.loadingInformation = true;
        break;
      case types.GET_DOCUMENT_INFORMATION_SUCCESS:
        draft.information = action.information;
        draft.loadingInformation = false;
        break;
      case types.GET_DOCUMENT_INFORMATION_FAIL:
        draft.information = [];
        draft.loadingInformation = false;
        break;
    }
  });

export default documentsReducer;
