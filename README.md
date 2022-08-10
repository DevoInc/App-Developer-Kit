# Devo Applications Developer Kit

Devo Applications Developer Kit is the mandatory NPM package to start building
javascript web browser applications on Devo, it allows you to
communicate your application with the devo web and APIs.

## Devo Apps

A Devo App is a front-end web browser extension capable of being injected and hosted into the Devo web platform as well as communicating with it and with the collection of HTTP services enabled for Devo customers.

## Before starting

As a main requirement for the development of applications in Devo it is necessary to have access to the platform and a domain.

Once you have access, to prepare the development environment you must install the google chrome extension "Devo Runner", you will find it [here](https://chrome.google.com/webstore/detail/devo-runner/apjjdfhcegcemhdhaeadkddbjhgfplmo). This extension will help the developer to be able to debug and develop their application by providing a mechanism to inject it into an existing Devo client domain.

## Instalation

Start by installing this package in your NPM project

```npm
$ npm install @devoinc/app-developer-kit
```

For these applications to be compatible with Devo and Devo Runner, it will be necessary to configure the javascript bundler so that the result of its process generates a single HTML file with all the javascript code and css styles inline. For this we recommend to use Webpack 5 and the [InlineChunkHtmlPlugin](https://www.npmjs.com/package/inline-chunk-html-plugin) plugin.

A complete usage example for this package can be found in this [react template](https://github.com/DevoInc/React-App-Template).

## Features

You can find the complete reference of the development kit API [here](https://devoinc.github.io/App-Developer-Kit/).

- **User information**:
The IDevoApp instance could be used to obtain the information of the current user who is executing this application in the web browser. 

```ts
import { 
    IDevoApp, 
    DevoAppProvider, 
    UserInfo,
} from '@devoinc/app-developer-kit';

(async () => {
    const dApp: IDevoApp = DevoAppProvider.init();
    const userInfo: UserInfo = await dApp.getUserInfo();
    console.log(userInfo);
})();
```

- **Create notifications messages**:
The IDevoApp instance could be used to render a devo notification message in the browser.

```ts
import { 
    IDevoApp, 
    DevoAppProvider, 
    NotipopRequest,
} from '@devoinc/app-developer-kit';

(async () => {
    const dApp: IDevoApp = DevoAppProvider.init();
    const notipop: NotipopRequest = {
        title: 'Hello world',
        text: '...',
        type: 'info',
    };
    await dApp.createNotiPop(notipop);
})();
```

- **Devo queries**:
The IDevoApp instance could be used to make queries on Devo query engine. You could found a complete documentation about Devo queries [here](extendedDoc/Queries.md).

- **Devo alerts**:
The IDevoApp instance could be used to operate with Devo alerts. You could found a complete documentation about Devo alerts [here](https://docs.devo.com/space/latest/95128644/Alerts%20API) and the client reference [here](https://devoinc.github.io/alerts-api-client/).

```ts
import { 
    IDevoApp, 
    DevoAppProvider, 
    AlertsApiClient,
} from '@devoinc/app-developer-kit';

(async () => {
    const dApp: IDevoApp = DevoAppProvider.init();
    const alertsClient: AlertsApiClient.IClient = await dApp.getAlertsClient('alertsApiUrl');
    const alertDefinitions: AlertsApiClient.AlertDefinition = await alertsClient.getAlerts();
    console.log(alertDefinitions);
})();
```

## Standalone mode

It is possible to initialize the IDevoApp instance to work in standalone mode, in this way, the different dependencies of the application with the Devo web core and API endpoints could be mocked. Just use the init method passing it a specific settings for the 'standaloneDependencies' field as the following example.

```ts
import { 
    IDevoApp, 
    DevoAppProvider,
    WebCoreRuntimeDeps,
    Dates,
} from '@devoinc/app-developer-kit';

(async () => {
    class StandaloneNotipop {
        constructor(request: NotiPopRequest) {
            console.log(`Fake notification`, request);
        }
    }

    const mockedUserInfo: UserInfo = {
        name: 'John Doe',
        email: 'a@b.com',
        locale: 'en-US',
        ...
    };

    const mockedGoToQuery: (query: string, dates: Dates) => {
        console.log(`Fake goToQuery. ${query} ${dates}`);
    };

    const dApp: IDevoApp = DevoAppProvider.init({
        standaloneDependencies: {
            goToQuery: mockedGoToQuery,
            userInfo: mockedUserInfo,
            NotiPop: StandaloneNotipop,
        },
    });
})();
```

## Publishing and hosting

The publishing and hosting process for these applications will be carried out by Devo employees. Please contact [Devo support](https://www.devo.com/legal-hub/support-services/) for this task.
