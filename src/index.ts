import { mockHana, mockSqlite, mockUser } from "./mocks";
import type { MockedObjects } from "./types";
import "./machers"


export type Feature = Exclude<keyof MockedObjects, 'clear'>;

const createClearFunction = (mockedObject: MockedObjects) => {
  return () => {

    if (mockedObject.sqlite !== undefined) {
      mockedObject.sqlite?.cqn?.mockClear()
      mockedObject.sqlite?.insert?.mockClear()
      mockedObject.sqlite?.delete?.mockClear()
      mockedObject.sqlite?.update?.mockClear()
      mockedObject.sqlite?.select?.mockClear()
      mockedObject.sqlite?.sql?.mockClear()
      mockedObject.sqlite?.stream?.mockClear()
    }

    if (mockedObject.hana !== undefined) {
      mockedObject.hana?.cqn?.mockClear()
      mockedObject.hana?.insert?.mockClear()
      mockedObject.hana?.delete?.mockClear()
      mockedObject.hana?.update?.mockClear()
      mockedObject.hana?.select?.mockClear()
      mockedObject.hana?.sql?.mockClear()
      mockedObject.hana?.stream?.mockClear()
    }

    if (mockedObject.user !== undefined) {
      mockedObject.user?.attr.mockClear()
      mockedObject.user?.is.mockClear()
      mockedObject.user?.locale.mockClear()
    }

  }
}

export type Keys<T> = Array<T[keyof T] extends true ? keyof T : undefined>


/**
 * You must setup mock before every thing
 *  
 * @param config 
 * @returns the mocked objects
 */
export const mockCDS = <T extends Array<Feature>>(...features: T): Pick<MockedObjects, T[number] | 'clear'> => {
  const mockedObjects: any = {
    clear: () => { }
  };
  mockedObjects.clear = createClearFunction(mockedObjects)
  if (features.includes("sqlite")) {
    mockedObjects.sqlite = mockSqlite();
  }
  if (features.includes("hana")) {
    mockedObjects.hana = mockHana();
  }
  if (features.includes("user")) {
    mockedObjects.user = mockUser();
  }
  return mockedObjects;
};



export { mockUtils } from "./mocks"