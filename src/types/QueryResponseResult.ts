/**
 * query result types as number or strings;
 *
 * @public
 */
export type QueryResultType = number | string;

/**
 * Query response result as a diccionary of QueryResultType
 *
 * @public
 */
export type QueryResponseResult = { [key: string]: QueryResultType };
