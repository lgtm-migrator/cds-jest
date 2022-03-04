import "./machers";
import { spyConnectTo, spyHanaExecution, spySqliteExecution, spyUser } from "./spy";
import type { Feature, SpiedObjects } from "./types";
import { createMockFunction } from "./clear";



/**
 * You must setup mock before every thing
 *  
 * @param config 
 * @returns the mocked objects
 */
export const spy = <T extends Array<Feature>>(...features: T): Pick<SpiedObjects, T[number] | 'clear' | "restore"> => {
  const spiedObjects: any = {
    clear: () => { }
  };

  spiedObjects.clear = createMockFunction(spiedObjects, "mockClear")
  spiedObjects.restore = createMockFunction(spiedObjects, "mockRestore")

  if (features.includes("sqliteExecution")) {
    spiedObjects.sqliteExecution = spySqliteExecution();
  }
  if (features.includes("hanaExection")) {
    spiedObjects.hanaExection = spyHanaExecution();
  }
  if (features.includes("connect")) {
    spiedObjects.connect = {}
    spiedObjects.connect.to = spyConnectTo()
  }
  if (features.includes("user")) {
    spiedObjects.user = spyUser();
  }
  return spiedObjects;
};


export { dummy } from "./dummy"
export { utils } from "./utils"
export { when } from "jest-when"

export * as errors from "./errors"