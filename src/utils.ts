import { when } from "jest-when";
import { dummy } from "./dummy";
import { DummyDatabase, SpiedObjects } from "./types";

/**
 * resolve module by current work-space
 * 
 * @param id 
 * @returns 
 */
export const cwdResolve = (id: string) => {
  return require.resolve(id, { paths: [process.cwd()] });
};

/**
 * require module from current work-space instead of module 
 * 
 * @param id 
 * @returns 
 */
export const cwdRequire = (id: string) => {
  return require(cwdResolve(id));
};

/**
 * spy all functions on object
 * 
 * @param object 
 * @param accessType 
 * @returns 
 */
export const spyAll = <T extends object>(obj: T, accessType?: "get" | "set") => {
  const spiedObject = {};
  if (typeof obj === "object") {
    Object.keys(obj).forEach(key => {
      // @ts-ignore
      if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] === "function") {
        // @ts-ignore
        spiedObject[key] = jest.spyOn(obj, key, accessType);
      }
    });
  }
  return spiedObject;
};


/**
 * cds mock/spy utils
 */
export const utils = {
  connect: {
    /**
     * deep mock `cds.connect.to`
     * 
     * @param spies 
     * @param models 
     */
    deep(spies: Partial<SpiedObjects>, ...models: Array<string>) {

      if (spies?.connect?.to === undefined) {
        throw new Error("must spy('connect') firstly");
      }

      spies?.connect?.to?.mockImplementation((service) => dummy.Service(service, ...models));

    },
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
      const cds = cwdRequire("@sap/cds");
      const instance = await dummy.Database(...models);
      cds.db = instance;
      return instance;
    },
    disable: {
      /**
       * disable `begin`,`commit`,`rollback`
       * 
       * only support `sqlite` now
       * 
       * @param mocks 
       */
      tx: (mocks: Partial<SpiedObjects>) => {
        const sql = mocks.sqliteExecution?.sql;
        if (sql !== undefined) {

          when(sql)
            .calledWith(
              // for transaction related event, only have 3 parameters
              expect.anything(),
              expect.stringMatching(/^\s*(begin|commit|rollback)/i),
              expect.anything(),
            )
            .mockReturnValue(Promise.resolve());
        }

      }
    }
  },
};
