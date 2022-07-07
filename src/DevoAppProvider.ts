import { DevoApp } from './devoApp/DevoApp';
import { IDevoApp } from './devoApp/DevoApp.Interface';
import { DevoAppConfig } from './types';

/**
 * Static class that provides a DevoApp instance.
 *
 * @public
 */
export class DevoAppProvider {
  private static _instance: IDevoApp | undefined = undefined;

  /**
   * Initialize DevoApp instance.
   *
   * @public
   *
   * @param config - Configuration for a Devo app
   *
   * @returns - DevoApp instance
   */
  public static init(config?: DevoAppConfig): IDevoApp {
    const app: IDevoApp = new DevoApp(config);
    this._instance = app;
    return this._instance;
  }

  /**
   * Get previusly initialized DevoApp instance.
   *
   * @public
   *
   * @throws Error if DevoAppProvider is not initialized
   *
   * @returns - DevoApp instance
   */
  public static getInstance(): IDevoApp {
    if (!this._instance) {
      throw new Error('DevoAppProvider is not initialized');
    }
    return this._instance;
  }
}
