import { IQueryClient } from '../QueryClient.interface';

export class QueryClientMock implements IQueryClient {
  runQuery = jest.fn();
  runCompactQuery = jest.fn();
  runStreamQuery = jest.fn();
}
