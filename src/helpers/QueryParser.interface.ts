import { Dates, Query } from '../types';
import { AppInfo } from '../types/AppInfo';

/**
 * Process and parse the query before sending it to the Serra API.
 *
 * @remarks
 * The reason of this processing is because is needed to apply complete day as time range
 * to queries that point to lookup tables.
 *
 * @internal
 */
export interface IQueryParser {
  /**
   * Gets processed query from a query
   *
   * @remarks
   * It is needed a replacemente for the Dates object to be able
   * to use it in queries that point to lookup tables.
   *
   * @param query - Devo query
   *
   * @returns - Proccessed query
   */
  processQuery: (query: Query, appInfo: AppInfo) => Query;
  /**
   * Replace query dates range if query data source is a lookup table
   * using today dates range.
   *
   * @internal
   *
   * @param queryString - processed query string
   * @param dates - query dates
   *
   * @returns - processed query dates
   */
  processQueryDates: (queryString: string, dates: Dates) => Dates;
  /**
   * Get today dates range valid for lookup table queries
   *
   * @internal
   *
   * @returns - today dates range
   */
  getDateForLookupTable: () => Dates;
}
