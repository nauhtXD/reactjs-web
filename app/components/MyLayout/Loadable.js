/**
 *
 * Asynchronously loads the component for MyLayout
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
