import { when } from "jest-when";
import { dummy } from "./dummy";
import { DummyDatabase, TestOptions, SpiedObjects } from "./types";

/**
 * assert giving function is a mock function, if not, will throw error
 * 
 * @param f a function
 * @returns 
 */
export const mustJestMock = <T extends (...args: any[]) => any>(f: T): jest.MockedFunction<T> => {
  if (!jest.isMockFunction(f)) {
    throw new TypeError("assert: is jest mock function");
  }
  return f as any;
};

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
  const spiedObject: any = {};
  if (typeof obj === "object") {
    for (const f of getAllFunctions(obj)) {
      spiedObject[f] = jest.spyOn(obj, f as any, accessType as any);
    }
  }
  return spiedObject;
};

/**
 * get all functions of object (with prototype)
 * 
 * @param object 
 * @returns 
 */
export const getAllFunctions = (object: any): Array<string> => {
  const props = new Set<string>();
  let obj = object;
  do {
    for (const attr of Object.getOwnPropertyNames(obj)) {
      props.add(attr);
    }
  } while (obj = Object.getPrototypeOf(obj));
  return Array.from(props).sort().filter((e: any) => typeof object[e] === "function");
};

/**
 * cds mock/spy utils
 */
export const utils = {
  mustJestMock,
  connect: {
    /**
     * deep mock `cds.connect.to`
     * 
     * @param spies 
     * @param options 
     */
    deep(spies: Partial<SpiedObjects>, options: TestOptions = {}) {

      if (spies?.connect?.to === undefined) {
        throw new Error("must spy('connect') firstly");
      }

      spies?.connect?.to?.mockImplementation((service) => dummy.Service(service, options));

    },
  },
  db: {
    /**
     * create a dummy `DatabaseService` which support you spy and change behaviour
     * 
     * it will be automatically assigned to the `cds.db` to make it works for handlers
     * 
     * @param options 
     * @returns 
     */
    async dummy(options: TestOptions = {}): Promise<jest.MockedObject<DummyDatabase>> {
      const cds = cwdRequire("@sap/cds");
      const instance = await dummy.Database(options);
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
