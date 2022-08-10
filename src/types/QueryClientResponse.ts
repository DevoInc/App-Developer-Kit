import { QueryClientResponseData } from './QueryClientResponseData';
import { QueryClientResponseMetadata } from './QueryClientResponseMetadata';
/**
 * Query client response type
 *
 * @public
 */
export type QueryClientResponse = {
  data: QueryClientResponseData[];
  metadata: QueryClientResponseMetadata;
};
