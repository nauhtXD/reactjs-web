/**
 *
 * Asynchronously loads the component for TempCom
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
