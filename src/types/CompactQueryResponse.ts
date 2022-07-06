/**
 * Field of a compact query response.
 *
 * @public
 */
export type CompactFieldResponse = {
  index: number;
  type: string;
};

/**
 * Compact query response.
 *
 * @public
 */
export type CompactQueryResponse = {
  fields: { [key: string]: CompactFieldResponse };
};
