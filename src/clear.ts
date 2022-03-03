import type { MockedObjects } from "./types"

export const createMockFunction = (mockedObject: MockedObjects, functionName: "mockClear" | "mockRestore") => {
  return () => {

    if (mockedObject.sqliteExecution !== undefined) {
      mockedObject.sqliteExecution?.cqn?.[functionName]()
      mockedObject.sqliteExecution?.insert?.[functionName]()
      mockedObject.sqliteExecution?.delete?.[functionName]()
      mockedObject.sqliteExecution?.update?.[functionName]()
      mockedObject.sqliteExecution?.select?.[functionName]()
      mockedObject.sqliteExecution?.sql?.[functionName]()
      mockedObject.sqliteExecution?.stream?.[functionName]()
    }

    if (mockedObject.hanaExection !== undefined) {
      mockedObject.hanaExection?.cqn?.[functionName]()
      mockedObject.hanaExection?.insert?.[functionName]()
      mockedObject.hanaExection?.delete?.[functionName]()
      mockedObject.hanaExection?.update?.[functionName]()
      mockedObject.hanaExection?.select?.[functionName]()
      mockedObject.hanaExection?.sql?.[functionName]()
      mockedObject.hanaExection?.stream?.[functionName]()
    }

    if (mockedObject.user !== undefined) {
      mockedObject.user?.attr[functionName]()
      mockedObject.user?.is[functionName]()
      mockedObject.user?.locale[functionName]()
    }

    if (mockedObject.connectTo !== undefined) {
      mockedObject.connectTo[functionName]()
    }

  }
}