import {
  CompactQueryResponse,
  Query,
  QueryResponseResult,
  UserInfo,
} from '../../types';
import { IQueryClient } from './QueryClient.interface';
import { QueryParser } from '../../helpers/QueryParser';
import { client } from '@devoinc/browser-sdk';

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

  constructor(userInfo: UserInfo) {
    this._userInfo = userInfo;
  }

  runQuery(query: Query) {
    return new Promise<QueryResponseResult[]>((resolve, reject) => {
      const browserSDKClient = this.getBrowserSDKClient();

      let metadata: any[] | undefined = undefined;
      const response: QueryResponseResult[] = [];

      const proccessedQuery = QueryParser.processQuery(query);

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
              metadata,
              (row: QueryResponseResult) => {
                response.push(row);
              }
            );
          },
          meta: (meta: any[]) => {
            metadata = meta;
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

  runCompactQuery(query: Query) {
    return new Promise<CompactQueryResponse>((resolve, reject) => {
      const browserSDKClient = this.getBrowserSDKClient();
      const proccessedQuery = QueryParser.processQuery(query);

      browserSDKClient.streamFetch(
        {
          query: proccessedQuery.queryString,
          dateFrom: proccessedQuery.dates.from,
          dateTo: proccessedQuery.dates.to,
        },
        {
          meta: (meta: any[]) => {
            const result: CompactQueryResponse = {
              fields: {},
            };

            meta.forEach((metadataItem, index) => {
              result.fields[metadataItem.name] = {
                index: index,
                type: metadataItem.type,
              };
            });

            resolve(result);
          },
          error: (error: any) => {
            reject(error);
          },
        }
      );
    });
  }

  runStreamQuery(
    query: string,
    dateFrom: Date | undefined,
    cbData: (dataRow: QueryResponseResult) => void,
    cbError: (error: Error) => void
  ) {
    const client = this.getBrowserSDKClient();

    let metadata: any[] | undefined;

    const stream = client.streamFetch(
      {
        query: query,
        dateFrom: dateFrom || new Date(Date.now()),
        dateTo: -1,
      },
      {
        data: (events: any[][]) => {
          this.processEventData(events, metadata, cbData);
        },
        meta: (meta: any[]) => {
          metadata = meta;
        },
        error: (error: Error) => {
          cbError(error);
        },
        done: () => {
          cbError(new Error('Stream query is done'));
        },
      }
    );

    const onClose = () => {
      stream.abort();
    };

    return onClose;
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

    const serreaUrl = credentials.serrea;
    const apiKey = credentials.apiKey;
    const apiSecret = credentials.apiSecret;

    return client({
      url: serreaUrl,
      apiKey: apiKey,
      apiSecret: apiSecret,
    });
  }

  /**
   * Browser SDK returns query rows destructured.
   * Every time new data is received it comes as a set of rows with unnamed columns.
   * Metadata is needed to know the column names.
   *
   * @private
   *
   * @param eventRows - rows of data
   * @param metadata - metadata of the query
   * @param cbData - callback to process data
   */
  private processEventData(
    eventRows: any[][],
    metadata: any[] | undefined,
    cbData: (dataRow: QueryResponseResult) => void
  ) {
    eventRows.forEach((row) => {
      const result: QueryResponseResult = {};
      if (metadata) {
        metadata.forEach((metadataColumn, index) => {
          const columnName: string = metadataColumn.name;
          result[columnName] = row[index];
        });
      }
      cbData(result);
    });
  }
}
