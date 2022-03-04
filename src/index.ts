import { spyConnectTo, spyHanaExecution, spySqliteExecution, spyUser } from "./spy";
import type { Feature, SpiedObjects } from "./types";
import "./machers"
import { createMockFunction } from "./clear";



/**
 * You must setup mock before every thing
 *  
 * @param config 
 * @returns the mocked objects
 */
export const spy = <T extends Array<Feature>>(...features: T): Pick<SpiedObjects, T[number] | 'clear' | "restore"> => {
  const mockedObjects: any = {
    clear: () => { }
  };

  mockedObjects.clear = createMockFunction(mockedObjects, "mockClear")
  mockedObjects.restore = createMockFunction(mockedObjects, "mockRestore")

  if (features.includes("sqliteExecution")) {
    mockedObjects.sqliteExecution = spySqliteExecution();
  }
  if (features.includes("hanaExection")) {
    mockedObjects.hanaExection = spyHanaExecution();
  }
  if (features.includes("connect")) {
    mockedObjects.connect = {}
    mockedObjects.connect.to = spyConnectTo()
  }
  if (features.includes("user")) {
    mockedObjects.user = spyUser();
  }
  return mockedObjects;
};


export { dummy } from "./dummy"
export { utils } from "./utils"
export { when } from "jest-when"

export * as errors from "./errors"