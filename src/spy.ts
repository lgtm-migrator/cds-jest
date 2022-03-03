import type { sqlite } from "./types/cds";
import { MockObjectWrapper } from "./types/mock";
import { cwdRequire, spyAll } from "./utils";
import { MockedObjects } from "./types";
import { when } from "jest-when";

export const mockConnectTo = () => {
  const cds = cwdRequire("@sap/cds")
  return jest.spyOn(cds.connect, "to")
}

export const mockUser = () => {
  const cds = cwdRequire("@sap/cds")
  let UserType = cwdRequire("@sap/cds/lib/req/user");

  // TODO: check user use custom authtication handler or not
  switch (cds.requires?.auth?.kind) {
    case 'mocked-auth':
      UserType = UserType.Anonymous
      break;
    case 'dummy':
      UserType = UserType.Privileged
    default:
      // do nothing, use plain `User`
      break;
  }

  return {
    attr: jest.spyOn(UserType.prototype, "attr", "get"),
    is: jest.spyOn(UserType.prototype, "is"),
    locale: jest.spyOn(UserType.prototype, "locale", "get"),
  };
};

export const mockSqliteExecution = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/sqlite/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<sqlite.executes>;
};


export const mockHanaExecution = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/hana/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<sqlite.executes>;
};


/**
 * cds mock/spy utils
 */
export const utils = {
  connect: {
    /**
     * connect to service with ServiceFactory
     * 
     * @param service 
     * @param models 
     * @returns 
     */
    async to<T = any>(service: string, ...models: Array<string>): Promise<T> {
      const cds = cwdRequire("@sap/cds")
      const ServiceFactory = cwdRequire("@sap/cds/lib/serve/factory")
      const srv = new ServiceFactory(service, await cds.load(models))
      srv.init && await srv.prepend(srv.init)
      srv.options.impl && await srv.prepend(srv.options.impl)
      return srv
    }
  },
  db: {
    disable: {
      /**
       * disable `begin`,`commit`,`rollback`
       * 
       * only support `sqlite` now
       * 
       * @param mocks 
       */
      tx: (mocks: Partial<MockedObjects>) => {
        const sql = mocks.sqliteExecution?.sql
        if (sql !== undefined) {

          when(sql)
            .calledWith(
              // for transaction related event, only have 3 parameters
              expect.anything(),
              expect.stringMatching(/^\s*(begin|commit|rollback)/i),
              expect.anything(),
            )
            .mockReturnValue(Promise.resolve())
        }

      }
    }
  },
}