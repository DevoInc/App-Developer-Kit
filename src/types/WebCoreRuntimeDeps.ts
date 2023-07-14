import { WebPreferences } from './AppPreferences';
import { Dates } from './Dates';
import { UserInfo } from './UserInfo';

/**
 * Devo web core dependencies.
 *
 * @remarks
 * This type is based on the current WebCore dependency implementation.
 * if you want to override these dependencies for a standalone mode,
 * use the DevoAppProvider's init method with a custom object based on this type.
 *
 * @public
 */
export type WebCoreRuntimeDeps = {
  /**
   * goToQuery function that redirects to query search tab of Devo web.
   */
  readonly goToQuery: (query: string, dates: Dates) => void;
  /**
   * NotiPop class
   *
   * @remarks
   * This field contain a class that is used to create a notipop alert on the screen.
   * If you want to use a different implementation for a standalon mode,
   * simply declare a class and pass it here.
   * A NotiPopRequest will be passed to the constructor.
   *
   * Use this as example of how to fake notipop in standalon mode:
   *
   * ```typescript
   * class StandaloneNotipop {
   *  constructor(request: NotiPopRequest) {
   *      ...
   *  }
   * }
   *
   * const standaloneDependencies: WebCoreRuntimeDeps = {
   *  NotiPop: StandaloneNotipop,
   *  ...
   * }
   *
   * DevoAppProvider.init({
   *  standaloneDependencies,
   * });
   * ```
   */
  readonly NotiPop?: any;
  /**
   * User info
   */
  readonly userInfo: UserInfo;
  /**
   * Object that contains functions to check, get and set app preferences
   */
  readonly AppPreferences: WebPreferences;
};
