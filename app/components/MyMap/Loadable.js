/**
 *
 * Asynchronously loads the component for MyMap
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
