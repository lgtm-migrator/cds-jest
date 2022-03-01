import type { sqlite } from "./types/cds";
import { MockObjectWrapper } from "./types/mock";
import { cwdRequire, spyAll } from "./utils";
import { MockedObjects } from "./types";

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

export const mockSqlite = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/sqlite/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<sqlite.executes>;
};


export const mockHana = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/hana/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<sqlite.executes>;
};


export const mockUtils = {
  disable: {
    db: {
      /**
       * disable `begin`,`commit`,`rollback`
       * 
       * @param mocks 
       */
      tx: (mocks: Partial<MockedObjects>) => {
        let sql = mocks.sqlite?.sql
        if (mocks.hana) {
          sql = mocks.hana.sql
        }
        if (sql !== undefined) {
          const original = sql.getMockImplementation()
          if (original !== undefined) {
            sql?.mockImplementation((dbc, sql, values, isOne, mapper) => {
              if (/^\s*(begin|commit|rollback)/i.test(sql)) {
                return Promise.resolve()
              }
              return original(dbc, sql, values, isOne, mapper)
            })
          }
        }

      }
    }
  },
}