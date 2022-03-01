import type * as cds from "./types/cds";
import { MockObjectWrapper } from "./types/mock";
import type * as mocks from "./mocks";


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
  user: ReturnType<typeof mocks.mockUser>;
  /**
   * function used to clear all mock objects
   */
  clear: Function;
}
