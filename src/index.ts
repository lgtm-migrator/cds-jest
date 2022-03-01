import { CDSMockConfig, DefaultCDSMockConfig } from "./config";
import { mockHana, mockSqlite, mockUser } from "./mocks";
import * as cds from "./types/cds";
import { MockObjectWrapper } from "./types/mock";

export interface MockedObjects {
  /**
   * database low level execute mock
   */
  executes?: MockObjectWrapper<cds.sqlite.executes>;
  user?: ReturnType<typeof mockUser>;


  /**
   * function used to clear all mock objects
   */
  clear: Function;
}

const createClearFunction = (mockedObject: MockedObjects) => {
  return () => {
    mockedObject.executes?.cqn?.mockClear()
    mockedObject.executes?.insert?.mockClear()
    mockedObject.executes?.delete?.mockClear()
    mockedObject.executes?.update?.mockClear()
    mockedObject.executes?.select?.mockClear()
    mockedObject.executes?.sql?.mockClear()
    mockedObject.executes?.stream?.mockClear()
    mockedObject.user?.attr.mockClear()
    mockedObject.user?.is.mockClear()
    mockedObject.user?.locale.mockClear()
  }
}

/**
 * You must setup mock before every thing
 *  
 * @param config 
 * @returns the mocked objects
 */
export const mockCDS = (config?: CDSMockConfig) => {
  const mockedObjects: MockedObjects = {
    clear: () => { }
  };
  mockedObjects.clear = createClearFunction(mockedObjects)

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

