import type { sqlite } from "./types/cds";
import type { MockObjectWrapper } from "./types/mock";
import { cwdRequire, spyAll } from "./utils";
import { createMocks, RequestOptions, MockRequest, MockResponse } from "node-mocks-http";


export const mockHttp = () => {

  const cds = cwdRequire("@sap/cds")

  return (options: RequestOptions) => {
    const { req, res } = createMocks(options)
    return new Promise<{ req: MockRequest<any>, res: MockResponse<any> }>((_resolve, _reject) => {
      cds.app.handle(req, res, (err: Error) => {
        if (err) {
          _reject(err)
        } else {
          _resolve({ req, res })
        }
      })
    })
  }

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
