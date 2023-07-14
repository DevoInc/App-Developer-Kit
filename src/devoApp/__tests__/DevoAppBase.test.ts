import { AlertsClientMock } from '../../clients/alerts/__mocks__/AlertsClient';
import { QueryClientMock } from '../../clients/query/__mocks__/QueryClient';
import { mockedWebCoreIntegration } from '../../helpers/__mocks__/WebCoreIntegration';
import {
  UserInfo,
  Query,
  NotiPopRequest,
  WebCoreRuntimeDeps,
} from '../../types';
import { AppInfo } from '../../types/AppInfo';
import { DevoAppBase } from '../DevoApp.Base';
import { IDevoApp } from '../DevoApp.Interface';

jest.mock('../../clients/query/QueryClient', () => ({
  __esModule: true,
  QueryClient: QueryClientMock,
}));

jest.mock('@devoinc/alerts-api-client', () => ({
  __esModule: true,
  Client: AlertsClientMock,
}));

class DevoAppTest extends DevoAppBase implements IDevoApp {
  private _userInfoResponse: Promise<UserInfo>;

  constructor(userInfoResponse: Promise<UserInfo>) {
    super();
    this._userInfoResponse = userInfoResponse;
  }

  getUserInfo(): Promise<UserInfo> {
    return this._userInfoResponse;
  }
  goToQuery(_query: Query): Promise<void> {
    return Promise.resolve();
  }
  createNotiPop(_request: NotiPopRequest): Promise<void> {
    return Promise.resolve();
  }

  async getRuntimeDependencies(): Promise<WebCoreRuntimeDeps> {
    return Promise.resolve(mockedWebCoreIntegration.getWebCoreDependencies(0));
  }

  setAppUnmountCallback(_cb: () => void): void {} // eslint-disable-line @typescript-eslint/no-empty-function
}

const mockedUserInfo: UserInfo = {
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

const userInfoResponse = new Promise<UserInfo>((resolve) => {
  resolve(mockedUserInfo);
});

describe('DevoApp Base Test', () => {
  it('It returns query client', async () => {
    const devoApp = new DevoAppTest(userInfoResponse);
    const appInfo: AppInfo = {
      application: 'app1',
      component: 'cmp1',
    };
    const queryClient = await devoApp.getQueryClient(appInfo);
    expect(queryClient).toBeInstanceOf(QueryClientMock);
  });

  it('It returns alerts client', async () => {
    const devoApp = new DevoAppTest(userInfoResponse);
    const alertsClient = await devoApp.getAlertsClient();
    expect(alertsClient).toBeInstanceOf(AlertsClientMock);
  });
});
