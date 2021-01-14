/**
 *
 * Asynchronously loads the component for Forum
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
