import type { db } from "./types/cds";
import { MockObjectWrapper } from "./types/mock";
import { cwdRequire, spyAll } from "./utils";

export const spyConnectTo = () => {
  const cds = cwdRequire("@sap/cds")
  return jest.spyOn(cds.connect, "to")
}

export const spyUser = () => {
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

export const spySqliteExecution = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/sqlite/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<db.executes>;
};


export const spyHanaExecution = () => {
  const executes = cwdRequire("@sap/cds/libx/_runtime/hana/execute");
  spyAll(executes);
  return executes as MockObjectWrapper<db.executes>;
};

