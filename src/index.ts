import { CDSMockConfig, DefaultCDSMockConfig } from "./config";
import { mockHana, mockSqlite, mockUser } from "./mocks";
import * as cds from "./types/cds";
import { MockObjectWrapper } from "./types/mock";

export interface MockedObjects {
  executes?: MockObjectWrapper<cds.sqlite.executes>;
  user?: ReturnType<typeof mockUser>;
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
  if (config.user === true) {
    mockedObjects.user = mockUser();
  }
  return mockedObjects;
};

