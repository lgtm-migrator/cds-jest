export interface CDSMockConfig {
  sqlite?: boolean;
  hana?: boolean;
};

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
