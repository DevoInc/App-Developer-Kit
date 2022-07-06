import { CompactQueryResponse, Query, QueryResponseResult } from '../../types';

/**
 * Client of Serrea API.
 *
 * @public
 */
export interface IQueryClient {
  /**
   * Run a single query into Devo query engine.
   *
   * @public
   *
   * @param query - Devo query
   * @param dates - Dates to query
   * @returns - Query response
   */
  runQuery(query: Query): Promise<QueryResponseResult[]>;

  /**
   * Run a single query but only return all the columns and column types from the query.
   *
   * @public
   *
   * @param query - Devo query
   * @param dates - Dates to query
   * @returns - CompactQuery Response
   */
  runCompactQuery(query: Query): Promise<CompactQueryResponse>;

  /**
   * Runs a query in stream mode.
   * This means run the query with no ending date, the query will be running until the stream is closed.
   *
   * @remarks
   * cbData callback will be triggered after every new single query row is received.
   * cbError returns any possible error.
   *
   * @public
   *
   * @param query - query to execute
   * @param dateFrom - start date
   * @param cbData - callback to process data
   * @param cbError - callback to process error
   * @returns - Callback to close stream query
   */
  runStreamQuery(
    query: string,
    dateFrom: Date | undefined,
    cbData: (data: QueryResponseResult) => void,
    cbError: (error: Error) => void
  ): () => void;
}
