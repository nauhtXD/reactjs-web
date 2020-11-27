/*
 * MyMenu Messages
 *
 * This contains all the text for the MyMenu component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MyMenu';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MyMenu component!',
  },
});
