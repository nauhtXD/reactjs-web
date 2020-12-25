/**
 *
 * Asynchronously loads the component for Epidemic
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
