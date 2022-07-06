/**
 * Current user credentials
 *
 * @public
 */
export type UserCredentials = {
  readonly alertsURI: string;
  readonly apiKey: string;
  readonly apiSecret: string;
  readonly enigmaURI: string;
  readonly investigationsURI: string;
  readonly jwtSessionCredentials: {
    readonly apiKey: string;
    readonly jwtUserId: string;
  };
  readonly marketplaceBundle: string;
  readonly marketplaceURI: string;
  /**
   * Serrea url
   */
  readonly serrea: string;
  /**
   * Tapu token
   */
  readonly standAloneToken: string;
};
