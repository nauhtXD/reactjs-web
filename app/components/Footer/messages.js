/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'dgihubs.components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.license.message`,
    defaultMessage: 'dgihubs Technology JSC',
  },
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      Made with love by {author}.
    `,
  },
});
