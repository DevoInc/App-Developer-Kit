import { WebCoreRuntimeDeps } from './WebCoreRuntimeDeps';

/**
 * Configuration for a Devo App initialization.
 *
 * @public
 */
export type DevoAppConfig = {
  /**
   * Standalone dependencies.
   *
   * @remarks
   *
   * This field is used to override the default WebCoreRuntimeDeps
   * from Devo web core in a standalone mode.
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
   * Callback to be called when the web core unmounts the app container.
   *
   * @public
   */
  onAppUnmount?: () => void;
};
