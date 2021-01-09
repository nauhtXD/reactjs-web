/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingUsers: false,
  users: [],
  loadingUserTypes: false,
  userTypes: [],
  loadingSubCategories: false,
  subCategories: [],
  loadingStatuses: false,
  statuses: [],
  loadingProblems: false,
  problems: [],
  loadingPosts: false,
  posts: [],
  loadingProvinces: false,
  provinces: [],
  loadingCenter: false,
  center: [],
  loadingContacts: false,
  contacts: [],
  loadingUrl: false,
  url: [],
  loadingHouseholds: false,
  households: [],
  loadingLands: false,
  lands: [],
  loadingPlants: false,
  plants: [],
  loadingGenusFeatures: false,
  genusFeatures: [],
  loadingBanners: false,
  banners: [],
  loadingDocuments: false,
  documents: [],
  loadingDocumentTypes: false,
  documentTypes: [],
  loadingFields: false,
  fields: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_USER:
        draft.loadingUsers = true;
        break;
      case types.GET_USER_SUCCESS:
        draft.users = action.users;
        draft.loadingUsers = false;
        break;
      case types.GET_USER_FAIL:
        draft.users = [];
        draft.loadingUsers = false;
        break;
      case types.GET_USER_TYPE:
        draft.loadingUserTypes = true;
        break;
      case types.GET_USER_TYPE_SUCCESS:
        draft.userTypes = action.userTypes;
        draft.loadingUserTypes = false;
        break;
      case types.GET_USER_TYPE_FAIL:
        draft.userTypes = [];
        draft.loadingUserTypes = false;
        break;
      case types.GET_SUB_CATEGORY:
        draft.loadingSubCategories = true;
        break;
      case types.GET_SUB_CATEGORY_SUCCESS:
        draft.subCategories = action.subCategories;
        draft.loadingSubCategories = false;
        break;
      case types.GET_SUB_CATEGORY_FAIL:
        draft.subCategories = [];
        draft.loadingSubCategories = false;
        break;
      case types.GET_STATUS:
        draft.loadingStatuses = true;
        break;
      case types.GET_STATUS_SUCCESS:
        draft.statuses = action.statuses;
        draft.loadingStatuses = false;
        break;
      case types.GET_STATUS_FAIL:
        draft.statuses = [];
        draft.loadingStatuses = false;
        break;
      case types.GET_PROBLEM:
        draft.loadingProblems = true;
        break;
      case types.GET_PROBLEM_SUCCESS:
        draft.problems = action.problems;
        draft.loadingProblems = false;
        break;
      case types.GET_PROBLEM_FAIL:
        draft.problems = [];
        draft.loadingProblems = false;
        break;
      case types.GET_POST:
        draft.loadingPosts = true;
        break;
      case types.GET_POST_SUCCESS:
        draft.posts = action.posts;
        draft.loadingPosts = false;
        break;
      case types.GET_POST_FAIL:
        draft.posts = [];
        draft.loadingPosts = false;
        break;
      case types.GET_PROVINCE:
        draft.loadingProvinces = true;
        break;
      case types.GET_PROVINCE_SUCCESS:
        draft.provinces = action.provinces;
        draft.loadingProvinces = false;
        break;
      case types.GET_PROVINCE_FAIL:
        draft.provinces = [];
        draft.loadingProvinces = false;
        break;
      case types.GET_CENTER:
        draft.loadingCenter = true;
        break;
      case types.GET_CENTER_SUCCESS:
        draft.center = action.center;
        draft.loadingCenter = false;
        break;
      case types.GET_CENTER_FAIL:
        draft.center = [];
        draft.loadingCenter = false;
        break;
      case types.GET_CONTACT:
        draft.loadingContacts = true;
        break;
      case types.GET_CONTACT_SUCCESS:
        draft.contacts = action.contacts;
        draft.loadingContacts = false;
        break;
      case types.GET_CONTACT_FAIL:
        draft.contacts = [];
        draft.loadingContacts = false;
        break;
      case types.UPLOAD_IMG:
        draft.loadingUrl = true;
        break;
      case types.UPLOAD_IMG_SUCCESS:
        draft.url = action.url;
        draft.loadingUrl = false;
        break;
      case types.UPLOAD_IMG_FAIL:
        draft.url = [];
        draft.loadingUrl = false;
        break;
      case types.UPLOAD_PDF:
        draft.loadingUrl = true;
        break;
      case types.UPLOAD_PDF_SUCCESS:
        draft.url = action.url;
        draft.loadingUrl = false;
        break;
      case types.UPLOAD_PDF_FAIL:
        draft.url = [];
        draft.loadingUrl = false;
        break;
      case types.GET_HOUSEHOLD:
        draft.loadingHouseholds = true;
        break;
      case types.GET_HOUSEHOLD_SUCCESS:
        draft.households = action.households;
        draft.loadingHouseholds = false;
        break;
      case types.GET_HOUSEHOLD_FAIL:
        draft.households = [];
        draft.loadingHouseholds = false;
        break;
      case types.GET_LAND:
        draft.loadingLands = true;
        break;
      case types.GET_LAND_SUCCESS:
        draft.lands = action.lands;
        draft.loadingLands = false;
        break;
      case types.GET_LAND_FAIL:
        draft.lands = [];
        draft.loadingLands = false;
        break;
      case types.GET_PLANT:
        draft.loadingPlants = true;
        break;
      case types.GET_PLANT_SUCCESS:
        draft.plants = action.plants;
        draft.loadingPlants = false;
        break;
      case types.GET_PLANT_FAIL:
        draft.plants = [];
        draft.loadingPlants = false;
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
      case types.GET_BANNER:
        draft.loadingBanners = true;
        break;
      case types.GET_BANNER_SUCCESS:
        draft.banners = action.banners;
        draft.loadingBanners = false;
        break;
      case types.GET_BANNER_FAIL:
        draft.banners = [];
        draft.loadingBanners = false;
        break;
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
      case types.GET_DOCUMENT_TYPE:
        draft.loadingDocumentTypes = true;
        break;
      case types.GET_DOCUMENT_TYPE_SUCCESS:
        draft.documentTypes = action.documentTypes;
        draft.loadingDocumentTypes = false;
        break;
      case types.GET_DOCUMENT_TYPE_FAIL:
        draft.documentTypes = [];
        draft.loadingDocumentTypes = false;
        break;
      case types.GET_FIELD:
        draft.loadingFields = true;
        break;
      case types.GET_FIELD_SUCCESS:
        draft.fields = action.fields;
        draft.loadingFields = false;
        break;
      case types.GET_FIELD_FAIL:
        draft.fields = [];
        draft.loadingFields = false;
        break;
    }
  });

export default adminReducer;
