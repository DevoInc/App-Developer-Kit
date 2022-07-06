import { Dates } from './Dates';

/**
 * Devo query
 *
 * @public
 */
export type Query = {
  /**
   * Query string
   */
  queryString: string;
  /**
   * Date range
   */
  dates: Dates;
};
