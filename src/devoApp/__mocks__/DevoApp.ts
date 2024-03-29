import { IDevoApp } from '../DevoApp.Interface';

export class DevoAppMock implements IDevoApp {
  getQueryClient = jest.fn();
  getAlertsClient = jest.fn();
  getPreferencesClient = jest.fn();
  createNotiPop = jest.fn();
  getUserInfo = jest.fn();
  isPolicyActionAllowed = jest.fn();
  goToQuery = jest.fn();
  setAppUnmountCallback = jest.fn();
}
