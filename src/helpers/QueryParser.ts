import { Dates, Query } from '../types';
import { AppInfo } from '../types/AppInfo';
import { IQueryParser } from './QueryParser.interface';

const QUERY_LOOKUPLIST_START = 'from my.lookuplist.';

const addPragmas = (queryString: string, appInfo: AppInfo): string => {
  queryString += ` pragma comment.application: "${appInfo.application}"`;
  queryString += ` pragma comment.component: "${appInfo.component}"`;

  return queryString;
};

export const QueryParser: IQueryParser = {
  processQuery: (query: Query, appInfo: AppInfo): Query => {
    const processedDates = QueryParser.processQueryDates(
      query.queryString,
      query.dates
    );
    const result: Query = {
      queryString: addPragmas(query.queryString, appInfo),
      dates: processedDates,
    };
    return result;
  },
  processQueryDates: (queryString: string, dates: Dates): Dates => {
    let result = dates;

    const isLookupTable = queryString.startsWith(QUERY_LOOKUPLIST_START);
    if (isLookupTable) {
      result = QueryParser.getDateForLookupTable();
    }

    return result;
  },
  getDateForLookupTable: (): Dates => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const from =
      yesterday.setHours(0, 0, 0, 0) -
      yesterday.getTimezoneOffset() * 60 * 1000;
    const to =
      today.setHours(0, 0, 0, 0) - today.getTimezoneOffset() * 60 * 1000;

    return { from, to };
  },
};
