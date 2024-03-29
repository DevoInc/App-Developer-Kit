import { IClient as IAlertsClient } from '@devoinc/alerts-api-client';
import { IQueryClient } from '../clients/query/QueryClient.interface';
import {
  NotiPopRequest,
  PreferencesClientConfig,
  Query,
  UserInfo,
} from '../types';
import { AppInfo } from '../types/AppInfo';
import { PreferencesClient } from '../clients/preferences/PreferencesClient';
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

  /**
   * Creates a client to manage app preferences
   *
   * @public
   *
   * @param config - config object for the client
   * @returns the app preferences client
   */
  getPreferencesClient(
    config: PreferencesClientConfig
  ): Promise<PreferencesClient>;

  /**
   * Checks if the user has a policy
   *
   * @public
   *
   * @param action - action to perform.
   * @param operation - Type of action (op_view or op_manage).
   */
  isPolicyActionAllowed(action: string, operation: string): boolean;
}
