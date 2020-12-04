import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the weatherMap state domain
 */

const selectWeatherMapDomain = state => state.weatherMap || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WeatherMap
 */

const makeSelectWeatherMap = () =>
  createSelector(
    selectWeatherMapDomain,
    substate => substate,
  );

export default makeSelectWeatherMap;
export { selectWeatherMapDomain };
