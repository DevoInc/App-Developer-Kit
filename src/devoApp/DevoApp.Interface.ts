import { IClient as IAlertsClient } from '@devoinc/alerts-api-client';
import { IQueryClient } from '../clients/query/QueryClient.interface';
import { NotiPopRequest, Query, UserInfo } from '../types';
/**
 * DevoApp operations.
 *
 * @public
 */
export interface IDevoApp {
  /**
   * Get a query client for Serra API.
   *
   * @public
   */
  getQueryClient(): Promise<IQueryClient>;
  /**
   * Get an alerts API client.
   *
   * @public
   *
   * @param alertsUrl - The alerts API URL.
   */
  getAlertsClient(alertsUrl: string): Promise<IAlertsClient>;
  /**
   * Create a notification on the screen.
   *
   * @public
   *
   * @param notipopRequest - Notipop request.
   */
  createNotiPop(notipopRequest: NotiPopRequest): Promise<void>;
  /**
   * Calls Devo webcore to obtain user information.
   *
   * @public
   */
  getUserInfo(): Promise<UserInfo>;
  /**
   * Calls Devo webcore to move current routing into 'search query' tab with specified query.
   *
   * @public
   *
   * @param query - query to be set in the search query tab
   */
  goToQuery(query: Query): Promise<void>;
}
