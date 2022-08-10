# Query client documentation

There are two methods on the query client that you can use: `runQuery` and `runStreamQuery`

These methods receive a Query object as a parameter that contains dates. These dates can be a js `Date` Object or a `number` epoch timestamp (in milliseconds)

## Method runQuery

This method returns a `Promise<QueryClientResponse>`. `QueryClientResponse` contains the fields `data` and `metadata`.

Usually, you would be interested in the data. Check out the `QueryClientResponseData` type.

The metadata is just the types of the data. Check out the `QueryClientResponseMetadata` type. You can find the
metadata types in the [official devo docs](https://docs.devo.com/space/latest/95128301/Running%20queries%20with%20the%20Query%20API#response_type4) in the JSON/simple/compact section.

This is an example of a request creation:

```ts
import {
  IDevoApp,
  DevoAppProvider,
  Query,
  NotiPopRequest,
} from '@devoinc/applications-developer-kit';

(async () => {
  const dApp: IDevoApp = DevoAppProvider.init();

  const query: Query = {
    queryString: `
            from ...
            select ...
        `,
    dates: {
      from: new Date('...').getMilliseconds(),
      to: new Date('...').getMilliseconds(),
    },
  };
  const queryClient: IQueryClient = await dApp.getQueryClient();
  const queryResponse = await queryClient.runQuery(query, dates);
  console.log(queryResponse);
})();
```

using this query:

```sql
from demo.ecommerce.data
  where isnotnull(clientIpAddress)
  select str(clientIpAddress) as clientIp
  where startswith(clientIp, "98.2")
  select ifthenelse(statusCode>=400 and statusCode<500,1.0,0.0) as clientError
  group every 1h by clientIp
  select sum(clientError) as clientErrors
```

this is an example of the queryReponse.data format:

```json
[
  {
    "eventdate": 1639584000000,
    "clientIp": "192.168.0.1",
    "clientErrors": 1
  },
  {
    "eventdate": 1639584000000,
    "clientIp": "192.168.0.2",
    "clientErrors": 1
  },
  {
    "eventdate": 1639584000000,
    "clientIp": "192.168.0.3",
    "clientErrors": 0
  }
]
```

and this is an example of the queryResponse.metadata format:

```
{
  "fields": {
    "eventdate": {
      "index": 0,
      "type": "timestamp"
    },
    "clientIp": {
      "index": 1,
      "type": "str"
    },
    "clientErrors": {
      "index": 2,
      "type": "float8"
    }
  }
}
```

## Method runStreamQuery

Two main differences with `runQuery`:

1 - instead of returning a promise, it uses callbacks. This means that the app can start using the returned data as soon as it's returned, before the server finishes sending data.

2 - The `to` date is optional. If it's not provided, the steam will be left open: the client will keep listening to new data from the server until the request is aborted.

### Example

For the same query above we could do:

```ts
const abortFunction = client.runStreamQuery(
  query,
  (data: QueryClientResponseData) => {
    console.log('data', data);
  },
  (progress: QueryClientResponseProgress) => {
    console.log('progress', progress);
  },
  (error: Error) => {
    console.log('error', error);
    stopLoading();
  },
  () => {
    console.log('done');
    stopLoading();
  }
);

// some time later
abortFunction();
```

Calling the abort function, will abort the network request at any time.

The QueryClientResponseProgress format is an array with one number, that represents the eventdate that is being processed. This can help calculate the progress of the response, relative to the `from` and `to` dates.

Example of progress event: `[1639584000000]`
