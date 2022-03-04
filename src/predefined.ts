import { when } from "jest-when";
import { dummy, spy } from ".";
import { cwdRequire, utils } from "./utils";


/**
 * pre-defined configuration for spy and mock
 */
export const predefined = {
  /**
   * full service layer spy
   * 
   * @param models model pathes 
   * @returns 
   */
  service(...models: Array<string>) {
    const spies = spy("connect", "user")
    utils.connect.deep(spies, ...models)
    const createDb = async () => {
      const cds = cwdRequire("@sap/cds")
      const db = await dummy.Database(...models)
      cds.db = db;
      return db
    }
    when(spies.connect.to).calledWith("db", expect.anything()).mockImplementation(createDb)
    when(spies.connect.to).calledWith("db").mockImplementation(createDb)
    return spies
  },

  /**
   * partial spy in server level
   * 
   * @returns 
   */
  server() {
    const spies = spy("sqliteExecution", "user")
    return spies
  }
}