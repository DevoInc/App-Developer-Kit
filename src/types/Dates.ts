/**
 * From/to date object
 * See this for reference: https://github.com/DevoInc/js-helper/blob/6ba3a8ec27a5ce4449a5a957b161ca81718c1b06/lib/config.js#L66
 *
 * @param dateFrom - start date. If it's a number value, it should be in epoc ms.
 * @param dateTo - end date. If it's a number value, it should be in epoc ms.
 *
 */
 export type Dates = {
  from: Date | number;
  to: Date | number;
};
