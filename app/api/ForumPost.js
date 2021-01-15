/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';

export const getForumComments = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_FORUM_COMMENT}/${data}`);
export const createForumComment = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_FORUM_COMMENT, data);
export const getForumPost = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_FORUM_POST}/${data}`);
