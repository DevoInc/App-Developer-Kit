import { IClient as IAlertsClient } from '@devoinc/alerts-api-client';
import { IQueryClient } from '../clients/query/QueryClient.interface';
import { NotiPopRequest, Query, UserInfo } from '../types';
import { AppInfo } from '../types/AppInfo';
/**
 * DevoApp operations.
 *
 * @public
 */
export interface IDevoApp {
  /**
   * Set the unmount callback to be called when the app is unmounted by Devo WebCore.
   *
   * @param cb
   * @public
   */
  setAppUnmountCallback(cb: () => void): void;
  /**
   * Get a query client for Serra API.
   *
   * @public
   */
  getQueryClient(appInfo: AppInfo): Promise<IQueryClient>;
  /**
   * Get an alerts API client.
   *
   * @public
   */
  getAlertsClient(): Promise<IAlertsClient>;
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
