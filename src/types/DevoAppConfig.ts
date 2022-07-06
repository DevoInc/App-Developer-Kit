import { WebCoreRuntimeDeps } from './WebCoreRuntimeDeps';

/**
 * Configuration for a Devo App initialization
 *
 * @public
 */
export type DevoAppConfig = {
  /**
   * Standalone dependencies.
   *
   * @public
   */
  standaloneDependencies?: WebCoreRuntimeDeps;
  /**
   * Default timeout for web core communication requests.
   *
   * @public
   */
  timeout?: number;
  /**
   * Callback to be called when the Web core destroys the app container
   *
   * @public
   */
  onAppUnmount?: () => void;
};
