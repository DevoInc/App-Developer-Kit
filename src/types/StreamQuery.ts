import { StreamDates as StreamDates } from './StreamDates';
/**
 * Devo query type for streaming
 *
 * @public
 */
export type StreamQuery = {
  /**
   * Query string
   */
  queryString: string;
  /**
   * Date range
   */
  dates: StreamDates;
};
