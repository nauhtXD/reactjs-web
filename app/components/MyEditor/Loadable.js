/**
 *
 * Asynchronously loads the component for MyEditor
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
