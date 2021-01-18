/**
 *
 * Asynchronously loads the component for Garden
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
