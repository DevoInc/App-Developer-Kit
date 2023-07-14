import { PreferenceResult, PreferenceScope } from '../../types/AppPreferences';

/**
 * Client of Serrea API.
 *
 * @public
 */
export interface IPreferencesClient {
  /**
   * Checks whether the user can set domain preferences
   * @public
   *
   * @returns {Promise<object>} true if the user can set domain preferences
   */
  readonly isAllowedDomain: () => Promise<boolean>;
  /**
   * Checks whether the user can set multitenant preferences
   * @public
   *
   * @returns {Promise<object>} true if the user can set multitenant preferences
   */
  readonly isAllowedMultitenant: () => Promise<boolean>;
  /**
   * Get the app preferences
   * @param scope The scope of the preference. It can be any of 'domain' | 'multitenant' | 'user_domain'
   * @returns {Promise<PreferenceResult>} A promise that resolves with the application preferences in JSON format.
   */
  readonly getAppPreferences: (
    scope: PreferenceScope
  ) => Promise<PreferenceResult>;
  /**
   * Set the app preferences
   * @param scope The scope of the preference. It can be any of 'domain' | 'multitenant' | 'user_domain'
   * @param settings The settings for the preferences (can be null to delete the preferences)
   * @returns {Promise<PreferenceResult>} A promise that resolves with the response data in JSON format.
   */
  readonly setAppPreferences: (
    scope: PreferenceScope,
    settings: object | null
  ) => Promise<PreferenceResult>;
}
