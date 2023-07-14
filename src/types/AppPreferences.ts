export interface PreferenceResult {
  msg: string;
  object: string | null;
  status: number;
  success: boolean;
}

export type PreferenceScope = 'domain' | 'multitenant' | 'user_domain';
/**
 * Type for the webapp preferences object.
 *
 * @public
 */
export type WebPreferences = {
  /**
   * Check domain permissions
   * @returns {Promise<object>} True if the user can set domain preferences
   */
  readonly isAllowedDomain: () => Promise<boolean>;
  /**
   * Check multitenant permissions
   * @returns {Promise<object>} True if the user can set multitenant preferences
   */
  readonly isAllowedMultitenant: () => Promise<boolean>;
  /**
   * Get the app preferences
   * @param appId The NASS app ID
   * @param scope The scope of the preference. It can be any of 'domain' | 'multitenant' | 'user_domain'
   * @returns {Promise<PreferenceResult>} A promise that resolves with the application preferences in JSON format.
   */
  readonly getAppPreferences: (
    appId: number,
    scope: PreferenceScope
  ) => Promise<PreferenceResult>;

  /**
   * Set the app preferences
   * @param appId The NASS app ID
   * @param scope The scope of the preference. It can be any of 'domain' | 'multitenant' | 'user_domain'
   * @param settings The settings for the preferences (can be null to delete the preferences)
   * @returns {Promise<PreferenceResult>} A promise that resolves with the response data in JSON format.
   */
  readonly setAppPreferences: (
    appId: number,
    scope: PreferenceScope,
    settings: object | string | null
  ) => Promise<PreferenceResult>;
};

export type PreferencesClientConfig = {
  /**
   * The NASS app ID
   */
  readonly appId: number;
};
