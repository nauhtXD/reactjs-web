/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';

export const getForumPosts = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_FORUM_POST);
export const createForumPost = data =>
  apiConfig.post(`${endpoint.API_ENDPOINT_GET_FORUM_POST}/${data}`);
