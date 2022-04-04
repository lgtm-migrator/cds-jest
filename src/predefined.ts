import { when } from "jest-when";
import { dummy, spy } from ".";
import { TestOptions } from "./types";
import { cwdRequire, utils } from "./utils";


/**
 * pre-defined configuration for spy and mock
 */
export const predefined = {
  /**
   * the hack way to spy full service layer, please try the `dummy.serve` firstly
   * 
   * @param models model pathes 
   * @returns 
   */
  service(options: TestOptions = {}) {
    const spies = spy("connect", "user");
    utils.connect.deep(spies, options);
    const createDb = async () => {
      const cds = cwdRequire("@sap/cds");
      const db = await dummy.Database(options);
      cds.db = db;
      return db;
    };
    when(spies.connect.to).calledWith("db", expect.anything()).mockImplementation(createDb);
    when(spies.connect.to).calledWith("db").mockImplementation(createDb);
    return spies;
  },

  /**
   * partial spy in server level
   * 
   * @returns 
   */
  server() {
    const spies = spy("sqliteExecution", "user");
    return spies;
  }

};
