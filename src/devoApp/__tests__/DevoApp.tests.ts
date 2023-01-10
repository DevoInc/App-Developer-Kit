import { QueryClientMock } from '../../clients/query/__mocks__/QueryClient';
import { UserInfo, Query, DevoAppConfig, NotiPopRequest } from '../../types';
import {
  mockedWebCoreIntegration,
  mockedWebCoreIntegrationGoToQuery,
  mockedWebCoreIntegrationNotipop,
  mockedWebCoreIntegrationUserInfo,
} from '../../helpers/__mocks__/WebCoreIntegration';
import { DevoApp } from '../DevoApp';
import { DEFAULT_INIT_TIMEOUT } from '../DevoApp.constants';

jest.mock('../../clients/query/QueryClient', () => ({
  __esModule: true,
  QueryClient: QueryClientMock,
}));

jest.mock('../../helpers/WebCoreIntegration', () => ({
  __esModule: true,
  WebCoreIntegration: mockedWebCoreIntegration,
}));

const mockedUserInfo: UserInfo = {
  name: 'John McDonald',
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
    marketplaceURI: 'mock-marketplace-uri',
    activeboardsURI: 'mock-activeboards-uri',
    serviceopsURI: 'mock-serviceops-uri',
    serrea: 'mock-serrea',
    standAloneToken: 'mock-stand-alone-token',
  },
};

const mockedNotiPopInit = jest.fn();

class MockedNotipop {
  constructor(request: NotiPopRequest) {
    mockedNotiPopInit(request);
  }
}

const mockedConfig: DevoAppConfig = {
  standaloneDependencies: {
    userInfo: mockedUserInfo,
    goToQuery: jest.fn(),
    NotiPop: MockedNotipop,
  },
  onAppUnmount: jest.fn(),
};

const query: Query = {
  queryString: `
        from serviceops.maps.hierarchy
        select last(entityName) as name
    `,
  dates: {
    from: new Date().getMilliseconds(),
    to: new Date().getMilliseconds(),
  },
};

describe('DevoApp Test', () => {
  it('Dismount callback is called', () => {
    new DevoApp(mockedConfig);

    mockedWebCoreIntegration._unmount();

    expect(mockedConfig.onAppUnmount).toHaveBeenCalled();
  });

  it('It use configured user info in case of have it', async () => {
    const devoApp = new DevoApp(mockedConfig);

    const userInfo = await devoApp.getUserInfo();

    expect(userInfo).toEqual(mockedUserInfo);
  });

  it('It use webcore integration to get user info in case of no configuration is provided', async () => {
    const devoApp = new DevoApp();

    const userInfo = await devoApp.getUserInfo();

    expect(userInfo).toEqual(mockedWebCoreIntegrationUserInfo);
  });

  it('It use configured goToSearch in case of have it', async () => {
    const devoApp = new DevoApp(mockedConfig);

    await devoApp.goToQuery(query);

    expect(mockedConfig.standaloneDependencies?.goToQuery).toHaveBeenCalled();
  });

  it('It use webcore integration to goToSearch in case of no configuration is provided', async () => {
    const devoApp = new DevoApp();

    await devoApp.goToQuery(query);

    expect(mockedWebCoreIntegrationGoToQuery).toHaveBeenCalled();
  });

  it('It use configured timeout to fetch dependencies', async () => {
    const timeout = 2000;
    const devoApp = new DevoApp({ timeout });

    await devoApp.getUserInfo();

    expect(mockedWebCoreIntegration.lastProvidedTimeout).toEqual(timeout);
  });

  it('It use default timeout to fetch dependencies', async () => {
    const devoApp = new DevoApp();

    await devoApp.getUserInfo();

    expect(mockedWebCoreIntegration.lastProvidedTimeout).toEqual(
      DEFAULT_INIT_TIMEOUT
    );
  });

  it('It use NotiPop configured dependency for standalon config', async () => {
    const devoApp = new DevoApp(mockedConfig);

    await devoApp.createNotiPop({ text: 'test-text' });

    expect(mockedNotiPopInit).toBeCalled();
  });

  it('It use real Notipop implementation if no configuration is provided', async () => {
    const devoApp = new DevoApp();

    await devoApp.createNotiPop({ text: 'test-text' });

    expect(mockedWebCoreIntegrationNotipop).toBeCalled();
  });
});
