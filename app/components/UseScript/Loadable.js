/**
 *
 * Asynchronously loads the component for UseScript
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
