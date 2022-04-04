import type { SpiedObjects } from "./types";

export const createMockFunction = (spiedObject: SpiedObjects, functionName: "mockClear") => {
  return () => {

    if (spiedObject.sqliteExecution !== undefined) {
      spiedObject.sqliteExecution?.cqn?.[functionName]();
      spiedObject.sqliteExecution?.insert?.[functionName]();
      spiedObject.sqliteExecution?.delete?.[functionName]();
      spiedObject.sqliteExecution?.update?.[functionName]();
      spiedObject.sqliteExecution?.select?.[functionName]();
      spiedObject.sqliteExecution?.sql?.[functionName]();
      spiedObject.sqliteExecution?.stream?.[functionName]();
    }

    if (spiedObject.hanaExecution !== undefined) {
      spiedObject.hanaExecution?.cqn?.[functionName]();
      spiedObject.hanaExecution?.insert?.[functionName]();
      spiedObject.hanaExecution?.delete?.[functionName]();
      spiedObject.hanaExecution?.update?.[functionName]();
      spiedObject.hanaExecution?.select?.[functionName]();
      spiedObject.hanaExecution?.sql?.[functionName]();
      spiedObject.hanaExecution?.stream?.[functionName]();
    }

    if (spiedObject.user !== undefined) {
      spiedObject.user?.attr[functionName]();
      spiedObject.user?.is[functionName]();
    }

    if (spiedObject.connect !== undefined) {
      spiedObject.connect?.to?.[functionName]();
    }

  };
};
