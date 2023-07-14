# App preferences client

The webapp provides methods for persisting arbitrary json objects. The Devo App Developer Kit helps using these methods. These methods are:

```
  type PreferenceScope = 'domain' | 'multitenant' | 'user_domain';

  isAllowedDomain: () => Promise<boolean>; // Checks if the user is allowed to change the domain default settings for the app.

  isAllowedMultitenant: () => Promise<boolean>; // Checks if the user is allowed to change the multitenant default settings for the app.

  getAppPreferences: (scope: PreferenceScope) => Promise<PreferenceResult>;
  setAppPreferences: (scope: PreferenceScope, settings: object | string | null) => Promise<PreferenceResult>;
```

See the jsdocs for more info about types.

The preferences `settings` object can be an arbitrary json object.

This is the meaning of the 3 scopes:

1. `user_domain`: Settings are accessible in the domain only by the user that created them.
2. `domain`: Settings are accessible in the domain by all users.
3. `multitenant`: Settings are accesible in all the domains of a multitenant (mssp) by all users.

## Example setting preferences

This is an example of a call to `setAppPreferences`:

```ts
import {
  IDevoApp,
  DevoAppProvider,
  IPreferencesClient,
  PreferenceScope,
  PreferenceResult,
} from '@devoinc/applications-developer-kit';

const preferencesClientConfig: PreferencesClientConfig = {
  appId: 303, // the appID in the NASS (it is a number)
};

(async () => {
  const dApp: IDevoApp = DevoAppProvider.init();
  const scope = `user_domain`;
  const settings = { field1: 'myfield1', field2: 'myfield2' };

  const preferencesClient: IPreferencesClient = await dApp.getPreferencesClient(
    preferencesClientConfig
  );
  const result: PreferenceResult = await client.setAppPreferences(
    scope,
    settings
  );
  console.log(result);
})();
```
