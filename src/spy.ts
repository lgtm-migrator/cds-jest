import type { sqlite } from "./types/cds";
import { MockObjectWrapper } from "./types/mock";
import { cwdRequire, spyAll } from "./utils";
import { DummyDatabase, MockedObjects } from "./types";
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
    fullMock(spies: MockedObjects, ...models: Array<string>) {

      if (spies?.connect?.to === undefined) {
        throw new Error("must spy('connect') firstly")
      }

      spies?.connect?.to.mockImplementation((service) => utils.connect.to(service, ...models))

    },
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
      const csn = await cds.load(models)
      const srv = new ServiceFactory(service, csn)
      srv.init && await srv.prepend(srv.init)
      srv.options.impl && await srv.prepend(srv.options.impl)
      srv.models = csn
      return srv
    }
  },
  db: {
    /**
     * create a dummy `DatabaseService` which support you spy and change behaviour
     * 
     * it will be automatically assigned to the `cds.db` to make it works for handlers
     * 
     * @param models 
     * @returns 
     */
    async dummy(...models: Array<string>): Promise<jest.MockedObject<DummyDatabase>> {
      const cds = cwdRequire("@sap/cds")
      const Service = cwdRequire("@sap/cds/libx/_runtime/sqlite/Service");
      const instance = new Service("db", await cds.load(models))
      instance.init && await instance.init()
      spyAll(instance)
      // TODO: for 'run' method, throw error for notify user should to mock
      const methods = ["acquire", "run", "deploy", "begin", "commit", "rollback"]
      for (const method of methods) {
        jest.spyOn(instance, method)
        instance?.[method]?.mockResolvedValue(undefined)
      }
      cds.db = instance
      return instance
    },
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