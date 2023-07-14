import {
  WebPreferences,
  PreferenceScope,
  PreferencesClientConfig,
} from '../../types';
import { IPreferencesClient } from './PreferencesClient.interface';

/**
 * App preferences Client.
 *
 * @remarks
 * This class allows to get and update app preferences
 * in the app, domain and multitennant scopes
 *
 * @internal
 *
 */
export class PreferencesClient implements IPreferencesClient {
  private readonly _config: PreferencesClientConfig;
  /**
   * This is the AppPreferences object provided by the webapp so we can make the calls
   */
  private readonly _webPreferences: WebPreferences;

  constructor(config: PreferencesClientConfig, webPreferences: WebPreferences) {
    this._config = config;
    this._webPreferences = webPreferences;
    if (!config || !config.appId) {
      throw Error('PreferencesClient requires a config object with appId');
    }
    if (typeof config.appId !== 'number') {
      throw Error('PreferencesClient config.appId should be a number');
    }
  }

  isAllowedDomain() {
    return this._webPreferences.isAllowedDomain();
  }

  isAllowedMultitenant() {
    return this._webPreferences.isAllowedMultitenant();
  }
  getAppPreferences(scope: PreferenceScope) {
    return this._webPreferences.getAppPreferences(this._config.appId, scope);
  }
  setAppPreferences(scope: PreferenceScope, settings: object | string | null) {
    return this._webPreferences.setAppPreferences(
      this._config.appId,
      scope,
      settings
    );
  }
}
