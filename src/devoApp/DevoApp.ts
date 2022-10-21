import { WebCoreIntegration } from '../helpers/WebCoreIntegration';
import {
  UserInfo,
  DevoAppConfig,
  WebCoreRuntimeDeps,
  Query,
  NotiPopRequest,
} from '../types';
import { DevoAppBase } from './DevoApp.Base';
import { DEFAULT_INIT_TIMEOUT } from './DevoApp.constants';

/**
 * DevoApp class that contains all possible operations.
 *
 * @remarks
 * This implementation is based on the current WebCore communication integration.
 *
 * @internal
 */
export class DevoApp extends DevoAppBase {
  protected _config?: DevoAppConfig;
  protected _unmountCallback?: () => void;

  constructor(config?: DevoAppConfig) {
    super();
    this._config = config;
    this._unmountCallback = config?.onAppUnmount;

    WebCoreIntegration.listenForUnmount(() => this.onAppUnmount());
  }

  async getUserInfo(): Promise<UserInfo> {
    const dependencies = await this.getRuntimeDependencies();
    return dependencies.userInfo;
  }

  async goToQuery(query: Query): Promise<void> {
    const dependencies = await this.getRuntimeDependencies();
    dependencies.goToQuery(query.queryString, query.dates);
  }

  async createNotiPop(request: NotiPopRequest): Promise<void> {
    const dependencies = await this.getRuntimeDependencies();
    if (dependencies.NotiPop) {
      new dependencies.NotiPop(request);
    }
  }

  setAppUnmountCallback(cb: () => void): void {
    this._unmountCallback = cb;
  }

  private async getRuntimeDependencies(): Promise<WebCoreRuntimeDeps> {
    let dependencies: WebCoreRuntimeDeps;
    if (this._config?.standaloneDependencies) {
      dependencies = this._config.standaloneDependencies;
    } else {
      const configuredTimeout = this._config?.timeout ?? DEFAULT_INIT_TIMEOUT;
      dependencies = await WebCoreIntegration.getWebCoreDependencies(
        configuredTimeout
      );
    }
    return dependencies;
  }

  private onAppUnmount(): void {
    if (this._unmountCallback) {
      this._unmountCallback();
    }
  }
}
