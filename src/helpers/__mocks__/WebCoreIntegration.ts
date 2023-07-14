import {
  NotiPopRequest,
  PreferenceResult,
  PreferenceScope,
  UserInfo,
  WebCoreRuntimeDeps,
  WebPreferences,
} from '../../types';
import { IWebCoreIntegration } from '../WebCoreIntegration.interface';

export const mockedWebCoreIntegrationUserInfo: UserInfo = {
  name: 'John Doe',
  email: 'a@b.com',
  locale: 'en-US',
  timezone: 'America/New_York',
  domain: 'mock',
  vault: {
    id: 1,
    name: 'mock-vault-name',
    label: 'mock-vault-label',
    share: 1,
  },
  applications: [],
  roles: [],
  credentials: {
    alertsURI: 'mock-alerts-uri',
    apiKey: 'mock-api-key',
    apiSecret: 'mock-api-secret',
    enigmaURI: 'mock-enigma-uri',
    investigationsURI: 'mock-investigations-uri',
    jwtSessionCredentials: {
      apiKey: 'mock-jwt-api-key',
      jwtUserId: 'mock-jwt-user-id',
    },
    serviceopsURI: 'mock-serviceops-uri',
    marketplaceURI: 'mock-marketplace-uri',
    activeboardsURI: 'mock-activeboards-uri',
    serrea: 'mock-serrea',
    standAloneToken: 'mock-stand-alone-token',
    telemetryURI: 'mock-telemetry-uri',
  },
};

export const mockedWebCoreIntegrationGoToQuery = jest.fn();
export const mockedWebCoreIntegrationNotipop = jest.fn();

class MockedNotipop {
  constructor(request: NotiPopRequest) {
    mockedWebCoreIntegrationNotipop(request);
  }
}

export const createGetAppPreferencesResponse: PreferenceResult = {
  msg: 'ok',
  object: 'whatever',
  status: 0,
  success: true,
};
export const createSetAppPreferencesResponse: PreferenceResult = {
  msg: 'ok',
  object: 'whatever',
  status: 0,
  success: true,
};
export const MockedAppPreferences: WebPreferences = {
  isAllowedDomain: () => Promise.resolve(true),
  isAllowedMultitenant: () => Promise.resolve(true),
  getAppPreferences: (appId: number, scope: PreferenceScope) =>
    Promise.resolve(createGetAppPreferencesResponse),
  setAppPreferences: (
    appId: number,
    scope: PreferenceScope,
    settings: object | null
  ) => Promise.resolve(Promise.resolve(createSetAppPreferencesResponse)),
};

const mockedRuntimeDeps: WebCoreRuntimeDeps = {
  goToQuery: mockedWebCoreIntegrationGoToQuery,
  NotiPop: MockedNotipop,
  userInfo: mockedWebCoreIntegrationUserInfo,
  AppPreferences: MockedAppPreferences,
};

class WebCoreIntegrationMock implements IWebCoreIntegration {
  private runtimeDeps: WebCoreRuntimeDeps;
  private unmountCallback?: () => void = undefined;

  public lastProvidedTimeout?: number = undefined;

  constructor(runtimeDeps: WebCoreRuntimeDeps) {
    this.runtimeDeps = runtimeDeps;
  }

  getWebCoreDependencies(_timeout: number) {
    this.lastProvidedTimeout = _timeout;
    return new Promise<WebCoreRuntimeDeps>((resolve) => {
      resolve(this.runtimeDeps);
    });
  }

  listenForUnmount(callback: () => void) {
    this.unmountCallback = callback;
  }

  _unmount() {
    if (this.unmountCallback) {
      this.unmountCallback();
    }
  }
}

export const mockedWebCoreIntegration = new WebCoreIntegrationMock(
  mockedRuntimeDeps
);
