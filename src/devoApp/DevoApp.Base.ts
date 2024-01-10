import { QueryClient } from '../clients/query/QueryClient';
import { IQueryClient } from '../clients/query/QueryClient.interface';
import {
  NotiPopRequest,
  PreferencesClientConfig,
  Query,
  UserInfo,
  WebCoreRuntimeDeps,
} from '../types';
import { IDevoApp } from './DevoApp.Interface';
import {
  Client as AlertsClient,
  IClient as IAlertsClient,
  IConfig as IAlertsConfig,
} from '@devoinc/alerts-api-client';
import { AlertsConfig } from '../clients/alerts/AlertsConfig';
import { AppInfo } from '../types/AppInfo';
import { PreferencesClient } from '../clients/preferences/PreferencesClient';

/**
 * DevoApp abstract base class.
 *
 * @remarks
 * The idea is to provide a common base class independant of
 * the webcore communication implementation.
 *
 * Here just the resolution of the API clients or any other feature
 * non-related with the webcore must be implemented.
 *
 * @internal
 * @param appInfo info about the app (id, component) that allows to log the origin of the query
 */
export abstract class DevoAppBase implements IDevoApp {
  public async getQueryClient(appInfo: AppInfo): Promise<IQueryClient> {
    const userInfo = await this.getUserInfo();
    const queryClient: IQueryClient = new QueryClient(userInfo, appInfo);
    return queryClient;
  }

  public async getAlertsClient(): Promise<IAlertsClient> {
    const userInfo = await this.getUserInfo();
    const standAloneToken = userInfo.credentials.standAloneToken;
    const alertsConfig: IAlertsConfig = new AlertsConfig(standAloneToken);
    const alertsUrl = userInfo.credentials.alertsURI;

    const alertsClient: IAlertsClient = new AlertsClient(
      alertsConfig,
      alertsUrl
    );
    return alertsClient;
  }

  public async getPreferencesClient(
    config: PreferencesClientConfig
  ): Promise<PreferencesClient> {
    const dependencies = await this.getRuntimeDependencies();
    return new PreferencesClient(config, dependencies.AppPreferences);
  }

  abstract createNotiPop(request: NotiPopRequest): Promise<void>;

  abstract getUserInfo(): Promise<UserInfo>;

  abstract goToQuery(query: Query): Promise<void>;

  abstract setAppUnmountCallback(cb: () => void): void;

  protected abstract getRuntimeDependencies(): Promise<WebCoreRuntimeDeps>;

  abstract isPolicyActionAllowed(action: string, operation: string): boolean;
}
