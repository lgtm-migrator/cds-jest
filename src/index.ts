import { CDSMockConfig, DefaultCDSMockConfig } from "./config";
import { mockHana, mockSqlite } from "./mocks";
import * as cds from "./types/cds";
import { MockObjectWrapper } from "./types/mock";

export interface MockedObjects {
  executes?: MockObjectWrapper<cds.sqlite.executes>;
}

/**
 * You must setup mock before every thing
 *  
 * @param config 
 * @returns the mocked objects
 */
export const mockCDS = (config?: CDSMockConfig) => {
  const mockedObjects: MockedObjects = {};
  config = Object.assign({}, DefaultCDSMockConfig, config ?? {});
  if (config.sqlite === true) {
    mockedObjects.executes = mockSqlite();
  }
  if (config.hana === true) {
    mockedObjects.executes = mockHana();
  }
  return mockedObjects;
};

