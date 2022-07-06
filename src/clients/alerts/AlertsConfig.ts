import { IConfig } from '@devoinc/alerts-api-client';

/**
 * Alerts API client configuration class.
 *
 * @internal
 */
export class AlertsConfig implements IConfig {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  getAuthorization() {
    return this._token;
  }
}
