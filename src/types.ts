import type * as cds from "./types/cds";
import type * as mocks from "./mocks";


/**
 * the mocked object
 */
export interface MockedObjects {

  /**
   * sqlite low level execute mock
   */
  sqlite: jest.MockedObject<cds.sqlite.executes>;
  /**
   * hana low level execute mock
   */
  hana: jest.MockedObject<cds.sqlite.executes>;
  /**
   * user which interacted in cds runtime
   */
  user: ReturnType<typeof mocks.mockUser>;
  /**
   * function used to clear all mock objects
   * 
   * invoke the `mockFunction.mockClear` for all mocks
   */
  clear: Function;
}
