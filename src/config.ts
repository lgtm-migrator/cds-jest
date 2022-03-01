export interface CDSMockConfig {
  sqlite?: boolean;
  hana?: boolean;
  user?: boolean;
  http?: boolean;
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
  hana: false,
  /**
   * mock user authentication
   */
  user: true,
  /**
   * support mock/stub http request without real http call
   */
  http: true,
};
