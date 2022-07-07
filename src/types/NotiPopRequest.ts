import { NotiPopPosition } from './NotiPopPosition';
import { NotiPopSize } from './NotiPopSize';
import { NotiPopType } from './NotiPopType';

/**
 * Request to create a notification on the screen.
 *
 * @public
 */
export type NotiPopRequest = {
  /**
   * NotiPop content text
   *
   * @required
   */
  text: string;
  /**
   * NotiPop title
   *
   * @optional
   */
  title?: string;
  /**
   * NotiPop subtitle
   *
   * @optional
   */
  subtitle?: string;
  /**
   * NotiPop type
   *
   * @optional
   *
   * @default 'success'
   */
  type?: NotiPopType;
  /**
   * NotiPop position
   *
   * @optional
   *
   * @default 'top-right'
   */
  position?: NotiPopPosition;
  /**
   * NotiPop timeout in milliseconds
   *
   * @optional
   *
   * @default auto
   */
  timer?: number;
  /**
   * NotiPop size
   *
   * @optional
   *
   * @default 'md'
   */
  size?: NotiPopSize;
  /**
   * NotiPop main icon class
   *
   * @optional
   *
   * @default 'lticon-information_about'
   */
  iconClass?: string;
  /**
   * NotiPop close icon class
   *
   * @optional
   *
   * @default 'lticon-exit_close'
   */
  iconCloseClass?: string;
};
