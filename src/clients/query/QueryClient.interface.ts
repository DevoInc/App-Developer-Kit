import {
  Query,
  QueryClientResponse,
  QueryClientResponseProgress,
  QueryClientResponseData,
  StreamQuery,
} from '../../types';

/**
 * Client of Serrea API.
 *
 * @public
 */
export interface IQueryClient {
  /**
   * Run a single query into Devo query engine. The promise will be fullfiled when all the data has been received.
   * Both dates (from, to) are required.
   * @public
   *
   * @param query - Devo query to run. See Query type for details.
   * @returns - Query response
   */
  runQuery(query: Query): Promise<QueryClientResponse>;

  /**
   * Runs a query in stream mode, with callbacks instead of having to wait
   * for the response to finish to get the data.
   * Only the from date is required. The to date is optional. The stream will be left open if the "to" date is falsy.
   *
   * @remarks
   * cbData callback will be triggered after every new single query row is received.
   * cbError returns any possible error. It's a terminal event
   * cbDone is called when only when dateTo is passed. It's a terminal event.
   * cbDone won't be called if dateTo is falsy because the stream will never end!
   *
   * @public
   *
   * @param query - Devo query to run. See StreamQuery type for details.
   * @param cbData - callback to process every event of data
   * @param cbProgress - callback to process progress of the response. It is an array that contains only a number
   * (the eventdate being processed). This event is not called very often, you will see it only in large queries.
   * @param cbError - callback to process error. This will be the last event in case of failure.
   * @param cbDone - callback to let the consumer know that the query has finished responding. This will be the last event in case of success.
   * @returns - Callback to abort the query (fetch abort: https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort)
   */
  runStreamQuery(
    query: StreamQuery,
    cbData: (data: QueryClientResponseData) => void,
    cbProgress: (progress: QueryClientResponseProgress) => void,
    cbError: (error: Error) => void,
    cbDone: () => void
  ): () => void;
}
