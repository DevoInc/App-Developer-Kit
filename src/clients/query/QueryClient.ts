import {
  Query,
  QueryClientResponse,
  QueryClientResponseData,
  QueryClientResponseProgress,
  QueryClientResponseMetadata,
  UserInfo,
  StreamQuery as StreamQuery,
} from '../../types';
import { IQueryClient } from './QueryClient.interface';
import { QueryParser } from '../../helpers/QueryParser';
import { client } from '@devoinc/browser-sdk';
import { AppInfo } from '../../types/AppInfo';

/**
 * Raw metadata type from the browser-sdk library
 *
 */
export type RawMetadata = { name: string; type: string };

/**
 * Wrapper of Browser SDK Serrea Client.
 *
 * @remarks
 * This class is a wrapper of the Browser SDK Serrea client where it is intended to wrap
 * its operations with an async/await syntax avoiding consuming them with callback hell
 *
 * @internal
 *
 */
export class QueryClient implements IQueryClient {
  private readonly _userInfo: UserInfo;
  private readonly _appInfo: AppInfo;

  constructor(userInfo: UserInfo, appInfo: AppInfo) {
    this._userInfo = userInfo;
    this._appInfo = appInfo;
    if (!appInfo || !appInfo.application || !appInfo.component) {
      throw Error('Need to pass AppInfo to get a query client');
    }
  }

  runQuery(query: Query) {
    return new Promise<QueryClientResponse>((resolve, reject) => {
      const browserSDKClient = this.getBrowserSDKClient();

      let rawMetadata: RawMetadata[] | undefined = undefined;
      const data: QueryClientResponseData[] = [];
      const metadata: QueryClientResponseMetadata = {
        fields: {},
      };
      const response: QueryClientResponse = {
        data,
        metadata,
      };
      const proccessedQuery = QueryParser.processQuery(query, this._appInfo);

      browserSDKClient.streamFetch(
        {
          query: proccessedQuery.queryString,
          dateFrom: proccessedQuery.dates.from,
          dateTo: proccessedQuery.dates.to,
        },
        {
          data: (events: any[][]) => {
            this.processEventData(
              events,
              rawMetadata,
              (row: QueryClientResponseData) => {
                data.push(row);
              }
            );
          },
          meta: (meta: RawMetadata[]) => {
            rawMetadata = meta; // rawMetadata will be used in processEventData later
            rawMetadata.forEach((metadataItem, index) => {
              metadata.fields[metadataItem.name] = {
                index: index,
                type: metadataItem.type,
              };
            });
          },
          error: (error: any) => {
            reject(error);
          },
          done: () => {
            resolve(response);
          },
        }
      );
    });
  }

  runStreamQuery(
    query: StreamQuery,
    cbData: (row: QueryClientResponseData) => void,
    cbProgress: (progress: QueryClientResponseProgress) => void,
    cbError: (error: Error) => void,
    cbDone: () => void
  ) {
    const client = this.getBrowserSDKClient();

    let rawMetadata: RawMetadata[] | undefined;
    const dateFrom = query.dates.from ? query.dates.from : Date.now();
    const dateTo = query.dates.to ? query.dates.to : -1;

    const stream = client.streamFetch(
      {
        query: query.queryString,
        dateFrom,
        dateTo,
      },
      {
        data: (events: any[][]) => {
          this.processEventData(events, rawMetadata, cbData);
        },
        meta: (meta: RawMetadata[]) => {
          rawMetadata = meta;
        },
        progress: (progress: QueryClientResponseProgress) => {
          cbProgress(progress);
        },
        error: (error: Error) => {
          cbError(error);
        },
        done: () => {
          cbDone();
        },
      }
    );

    const abort = () => {
      if (stream) {
        // stream can be falsy. See https://github.com/DevoInc/browser-sdk/blob/ac19cafaf01fa336a8f4ac988c1157f2f4f101bd/lib/client.js#L58
        stream.abort();
      }
    };

    return abort;
  }

  /**
   * Returns browser SDK client instance using user info credentials.
   *
   * @private
   *
   * @returns - Browser SDK client
   */
  private getBrowserSDKClient() {
    const credentials = this._userInfo.credentials;
    let token = '';
    if (credentials.standAloneToken) {
      // serrea authentication requires a Bearer token. We need to append it here.
      token = `Bearer ${credentials.standAloneToken}`;
    }

    return client({
      url: credentials.serrea,
      apiKey: credentials.apiKey,
      apiSecret: credentials.apiSecret,
      token,
    });
  }

  /**
   * Browser SDK returns query rows destructured.
   * Every time new data is received it comes as a set of rows with unnamed columns.
   * Metadata is needed to know the column names.
   *
   * @private
   *
   * @param events - event with data. Each event is an array of data.
   * @param metadata - metadata of the query
   * @param cbData - callback to process data
   */
  private processEventData(
    events: any[][],
    metadata: RawMetadata[] | undefined,
    cbData: (row: QueryClientResponseData) => void
  ) {
    events.forEach((event) => {
      const result: QueryClientResponseData = {};
      if (metadata) {
        metadata.forEach((metadataColumn, index) => {
          const columnName: string = metadataColumn.name;
          result[columnName] = event[index];
        });
      }
      cbData(result);
    });
  }
}
