import * as cds from "./types/cds";
import type { MockObjectWrapper } from "./types/mock";
import { cwdRequire, spyAll } from "./utils";
export const mockSqlite = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/sqlite/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<cds.sqlite.executes>;
};


export const mockHana = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/hana/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<cds.sqlite.executes>;
};
