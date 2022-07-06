import { Dates } from './Dates';
import { UserInfo } from './UserInfo';

/**
 * Web core dependencies type.
 *
 * @remarks
 * This type is based on the current WebCore dependency implementation.
 * If you want to use a different implementation for a standalon app,
 * you can implement this interface in a new custom object.
 *
 * @public
 */
export type WebCoreRuntimeDeps = {
  /**
   * goToQuery function that redirects to query search UI
   */
  readonly goToQuery: (query: string, dates: Dates) => void;
  /**
   * NotiPop class
   *
   * @remarks
   * This field contain a class that is used to create a notipop alert on the screen.
   * If you want to use a different implementation for a standalon app,
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
};
