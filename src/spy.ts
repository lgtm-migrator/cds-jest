import { createMockFunction } from "./clear";
import { Feature, SpiedObjects } from "./types";
import type { db } from "./types/cds";
import { MockObjectWrapper } from "./types/mock";
import { cwdRequire, spyAll } from "./utils";

/**
 * You must setup mock before every thing
 *  
 * @param config 
 * @returns the mocked objects
 */
export const spy = <T extends Array<Feature>>(...features: T): Pick<SpiedObjects, T[number] | "clear"> => {
  const spiedObjects: any = {
    clear: () => { }
  };

  spiedObjects.clear = createMockFunction(spiedObjects, "mockClear");

  if (features.includes("sqliteExecution")) {
    spiedObjects.sqliteExecution = spySqliteExecution();
  }
  if (features.includes("hanaExecution")) {
    spiedObjects.hanaExecution = spyHanaExecution();
  }
  if (features.includes("connect")) {
    spiedObjects.connect = {};
    spiedObjects.connect.to = spyConnectTo();
  }
  if (features.includes("user")) {
    spiedObjects.user = spyUser();
  }
  return spiedObjects;
};


export const spyConnectTo = () => {
  const cds = cwdRequire("@sap/cds");
  return jest.spyOn(cds.connect, "to");
};

export const spyUser = () => {
  const UserType = cwdRequire("@sap/cds/lib/req/user").Anonymous;

  return {
    attr: jest.spyOn(UserType.prototype, "attr", "get"),
    is: jest.spyOn(UserType.prototype, "is"),
  };
};

export const spySqliteExecution = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/sqlite/execute");
  return spyAll(executes) as MockObjectWrapper<db.executes>;
};


export const spyHanaExecution = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/hana/execute");
  return spyAll(executes) as MockObjectWrapper<db.executes>;
};

