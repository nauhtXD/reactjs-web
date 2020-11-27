/**
 *
 * Asynchronously loads the component for MyMenu
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
