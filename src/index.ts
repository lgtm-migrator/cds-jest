import { mockHana, mockHttp, mockSqlite, mockUser } from "./mocks";
import * as cds from "./types/cds";
import { MockObjectWrapper } from "./types/mock";

export interface MockedObjects {

  /**
   * sqlite low level execute mock
   */
  sqlite: MockObjectWrapper<cds.sqlite.executes>;
  /**
   * hana low level execute mock
   */
  hana: MockObjectWrapper<cds.sqlite.executes>;
  /**
   * user which interacted in cds runtime
   */
  user: ReturnType<typeof mockUser>;

  /**
   * create mocked request and await the mocked response, and assert the mocked response
   */
  http: ReturnType<typeof mockHttp>;

  /**
   * function used to clear all mock objects
   */
  clear: Function;
}

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

    if (mockedObject.http !== undefined) {
      // do nothing
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
  if (features.includes("http")) {
    mockedObjects.http = mockHttp()
  }
  return mockedObjects;
};
