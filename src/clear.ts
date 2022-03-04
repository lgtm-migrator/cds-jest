import type { SpiedObjects } from "./types"

export const createMockFunction = (spiedObject: SpiedObjects, functionName: "mockClear" | "mockRestore") => {
  return () => {

    if (spiedObject.sqliteExecution !== undefined) {
      spiedObject.sqliteExecution?.cqn?.[functionName]()
      spiedObject.sqliteExecution?.insert?.[functionName]()
      spiedObject.sqliteExecution?.delete?.[functionName]()
      spiedObject.sqliteExecution?.update?.[functionName]()
      spiedObject.sqliteExecution?.select?.[functionName]()
      spiedObject.sqliteExecution?.sql?.[functionName]()
      spiedObject.sqliteExecution?.stream?.[functionName]()
    }

    if (spiedObject.hanaExection !== undefined) {
      spiedObject.hanaExection?.cqn?.[functionName]()
      spiedObject.hanaExection?.insert?.[functionName]()
      spiedObject.hanaExection?.delete?.[functionName]()
      spiedObject.hanaExection?.update?.[functionName]()
      spiedObject.hanaExection?.select?.[functionName]()
      spiedObject.hanaExection?.sql?.[functionName]()
      spiedObject.hanaExection?.stream?.[functionName]()
    }

    if (spiedObject.user !== undefined) {
      spiedObject.user?.attr[functionName]()
      spiedObject.user?.is[functionName]()
      spiedObject.user?.locale[functionName]()
    }

    if (spiedObject.connect !== undefined) {
      spiedObject.connect?.to?.[functionName]()
    }

  }
}