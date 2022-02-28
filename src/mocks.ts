import * as cds from "./types/cds";
import type { MockObjectWrapper } from "./types/mock";
import { cwdRequire, spyAll } from "./utils";

export const mockUser = () => {
  const User = cwdRequire("@sap/cds/lib/req/user");
  
  return {
    attr: jest.spyOn(User.prototype, "attr", "get"),
    is: jest.spyOn(User.prototype, "is"),
    locale: jest.spyOn(User.prototype, "locale", "get"),
  };
};

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
