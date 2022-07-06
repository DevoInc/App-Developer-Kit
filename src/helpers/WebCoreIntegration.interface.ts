import { WebCoreRuntimeDeps } from '../types';
/**
 * Web core communication integration functions.
 *
 * @internal
 */
export interface IWebCoreIntegration {
  /**
   * Get dependencies from web core via event.
   *
   * @remarks
   * Web core will send event with runtime dependencies
   * after dispatching 'getVappDeps' custom event.
   *
   * @internal
   *
   * @param timeout - Timeout for waiting web core event
   * @returns - Web core runtime dependencies
   */
  getWebCoreDependencies: (timeout: number) => Promise<WebCoreRuntimeDeps>;
  /**
   * Check when web core unmounts the app container to send back a callback.
   *
   * @remarks
   * It is important to avoid memory leaks that the consumer free some resources that it
   * may be sharing with the web core such as timeouts, intervals, async calls or the SPA itselfs.
   *
   * @internal
   *
   * @param unmountCallback - Callback that will be called when web core unmount the dApp
   */
  listenForUnmount: (callback: () => void) => void;
}
