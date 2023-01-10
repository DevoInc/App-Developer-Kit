/**
 * Current user credentials.
 *
 * @public
 */
export interface UserCredentials extends Readonly<Record<string, any>> {

  // Credentials for the current user

  /**
   * Tapu token
   */
  standAloneToken: string;

  /**
   * Devo api key
   */
  apiKey: string;

  /**
   * Devo api secret
   */
  apiSecret: string;

  /**
   * JWT Session credentials
   */
  jwtSessionCredentials: {
    readonly apiKey: string;
    readonly jwtUserId: string;
  };

  // API urls

  /**
   * Alerts API url
   */
  alertsURI: string;

  /**
   * Enigma API url
   */
  enigmaURI: string;

  /**
   * Investigations API url
   */
  investigationsURI: string;

  /**
   * Marketplace API url
   */
  marketplaceURI: string;

  /**
   * Activeboards API url
   */
  activeboardsURI: string;

  /**
   * Service operations API url
   */
  serviceopsURI: string;

  /**
   * Serrea API url
   */
  serrea: string;
};
