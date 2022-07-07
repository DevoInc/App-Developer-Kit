import { UserApplication } from './UserApplication';
import { UserCredentials } from './UserCredentials';
import { UserVault } from './UserVault';

/**
 * Current user information.
 *
 * @public
 */
export type UserInfo = {
  /**
   * User name
   */
  readonly name: string;
  /**
   * User email
   */
  readonly email: string;
  /**
   * user locale (language)
   */
  readonly locale: string;
  /**
   * timezone
   */
  readonly timezone: string;
  /**
   * domain
   */
  readonly domain: string;
  /**
   * vault
   */
  readonly vault: UserVault;
  /**
   * Current user apps
   */
  readonly applications: UserApplication[];
  /**
   * credentials
   */
  readonly credentials: UserCredentials;
};
