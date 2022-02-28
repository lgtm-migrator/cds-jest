import { CDSMockConfig, DefaultCDSMockConfig } from "./config";
import { mockSqlite } from "./mocks";
import { MockObjectWrapper } from "./types/mock";


export interface MockedObjects {
  executes?: MockObjectWrapper<typeof import("./types/cds/sqlite/execute")>;
}

/**
 * You must setup mock before every thing
 *  
 * @param config 
 * @returns 
 */
export const mockCDS = (config?: CDSMockConfig) => {
  const mockedObjects: MockedObjects = {};
  config = Object.assign({}, DefaultCDSMockConfig, config ?? {});
  if (config.sqlite === true) {
    mockedObjects.executes = mockSqlite();
  }
  return mockedObjects;
};

