export interface CDSMockConfig {
  sqlite?: boolean;
  hana?: boolean;
};

/**
 * the default configuration of cds-mock
 */
export const DefaultCDSMockConfig: CDSMockConfig = {
  /**
   * mock sqlite.`executes` 
   */
  sqlite: true,
  /**
   * mock hana.`executes`
   */
  hana: false
};
