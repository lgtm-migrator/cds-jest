import { mockConnectTo, mockHanaExecution, mockSqliteExecution, mockUser } from "./spy";
import type { Feature, MockedObjects } from "./types";
import "./machers"
import { createMockFunction } from "./clear";



/**
 * You must setup mock before every thing
 *  
 * @param config 
 * @returns the mocked objects
 */
export const spy = <T extends Array<Feature>>(...features: T): Pick<MockedObjects, T[number] | 'clear' | "restore"> => {
  const mockedObjects: any = {
    clear: () => { }
  };

  mockedObjects.clear = createMockFunction(mockedObjects, "mockClear")
  mockedObjects.restore = createMockFunction(mockedObjects, "mockRestore")

  if (features.includes("sqliteExecution")) {
    mockedObjects.sqliteExecution = mockSqliteExecution();
  }
  if (features.includes("hanaExection")) {
    mockedObjects.hanaExection = mockHanaExecution();
  }
  if (features.includes("connectTo")) {
    mockedObjects.connectTo = mockConnectTo()
  }
  if (features.includes("user")) {
    mockedObjects.user = mockUser();
  }
  return mockedObjects;
};



export { utils } from "./spy"
export { when } from "jest-when"