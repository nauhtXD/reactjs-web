/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'digihubs.containers.NotFoundPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Page not found.',
  },
  backHome: {
    id: `${scope}.back.home`,
    defaultMessage: 'Back home',
  },
  pageNotFound: {
    id: `${scope}.pageNotFound`,
    defaultMessage: 'Sorry, the page you visited does not exist.',
  },
});
