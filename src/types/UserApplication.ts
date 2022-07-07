/**
 * Current user application.
 *
 * @public
 */
export type UserApplication = {
  readonly id: number;
  readonly name: string;
  readonly nameI18n: string;
  readonly path: string;
  readonly type: string;
};
