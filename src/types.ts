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

  connect: {
    /**
     * spy connect to
     */
    to: jest.SpyInstance<any>;
  };
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


export interface DummyDatabase {
  run: (...args: Array<any>) => any;
  acquire: (arg: any) => any;
  deploy(model?: any | string): Promise<any>;
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}


export type Feature = Exclude<keyof MockedObjects, 'clear'>;


export type Keys<T> = Array<T[keyof T] extends true ? keyof T : undefined>