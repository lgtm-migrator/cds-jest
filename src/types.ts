import type * as cds from "./types/cds";
import type * as mocks from "./spy";


/**
 * the mocked object
 */
export interface MockedObjects {

  /**
   * sqlite low level execute mock
   */
  sqliteExecution: jest.MockedObject<cds.sqlite.executes>;
  /**
   * hana low level execute mock
   */
  hanaExection: jest.MockedObject<cds.sqlite.executes>;
  /**
   * user which interacted in cds runtime
   */
  user: ReturnType<typeof mocks.mockUser>;
  /**
   * mocked connect to
   */
  connectTo: jest.SpyInstance<any>;
  /**
   * function used to clear all mock objects
   * 
   * invoke the `mockFunction.mockClear` for all mocks
   */
  clear: Function;
  /**
   * invoke the `mockFunction.mockRestore` for all mocks
   */
  restore: Function;
}


export type Feature = Exclude<keyof MockedObjects, 'clear'>;


export type Keys<T> = Array<T[keyof T] extends true ? keyof T : undefined>