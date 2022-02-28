import type { MockObjectWrapper } from "./types/mock";
import { spyAll } from "./utils";

export const mockSqlite = () => {
  const executes = require("@sap/cds/libx/_runtime/sqlite/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<typeof import("./types/cds/sqlite/execute")>;
};


export const mockHana = () => {
  const executes = require("@sap/cds/libx/_runtime/hana/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<typeof import("./types/cds/sqlite/execute")>;
};

