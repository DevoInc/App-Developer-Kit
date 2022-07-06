import { IClient as IAlertsClient } from '@devoinc/alerts-api-client';

export class AlertsClientMock implements IAlertsClient {
  public updateStatusLists = jest.fn();
  public addComment = jest.fn();
  public addComments = jest.fn();
  public deleteComment = jest.fn();
  public getList = jest.fn();
  public updateComment = jest.fn();
  public updateComments = jest.fn();
  public get = jest.fn();
  public getListByCriterias = jest.fn();
  public getListByCriteriasOverview = jest.fn();
  public getStatistics = jest.fn();
  public listStatus = jest.fn();
  public updateStatus = jest.fn();
  public getAlerts = jest.fn();
  public putAlerts = jest.fn();
  public postAlerts = jest.fn();
  public deleteAlerts = jest.fn();
  public putAlertsBatch = jest.fn();
  public postAlertsBatch = jest.fn();
  public putAlertStatus = jest.fn();
  public setTags = jest.fn();
}
