/**
 * query result types as number or strings;
 *
 * @public
 */
 export type QueryClientResponseDataType = number | string | boolean;

 /**
  * Query response result as a diccionary of QueryResponseDataType
  *
  * @public
  */
 export type QueryClientResponseData = {
   [key: string]: QueryClientResponseDataType;
 };
 