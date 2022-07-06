import { IDevoApp } from '../DevoApp.Interface';

export class DevoAppMock implements IDevoApp {
  getQueryClient = jest.fn();
  getAlertsClient = jest.fn();
  createNotiPop = jest.fn();
  getUserInfo = jest.fn();
  goToQuery = jest.fn();
}
