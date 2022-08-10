/**
 * Field type of a query response metadata type.
 *
 * @public
 */
 export type QueryClientResponseMetadataType = {
    index: number;
    type: string;
  };
  
  /**
   * Query response metadata.
   *
   * @public
   */
  export type QueryClientResponseMetadata = {
    fields: { [key: string]: QueryClientResponseMetadataType };
  };
  