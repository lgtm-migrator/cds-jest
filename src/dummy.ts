/* eslint-disable camelcase */
import { cwdRequireCDS } from "cds-internal-tool";
import { DB_DEFAULT_REJECT_METHODS, DB_DEFAULT_RESOLVE_METHODS } from "./constants";
import { NotImplementError } from "./errors";
import { DummyDatabase, TestOptions } from "./types";
import { cwdRequire, spyAll } from "./utils";

export async function Database(options: TestOptions = {}): Promise<jest.MockedObject<DummyDatabase>> {
  const cds = cwdRequire("@sap/cds");

  class DummyDataBaseService extends cwdRequire("@sap/cds/libx/_runtime/sqlite/Service") {
    constructor(...args: any[]) {
      super(...args);
    }
  };

  const instance: any = new DummyDataBaseService("db", await cds.load("*", Object.assign({}, cds.options, options)));
  instance.init && await instance.init();

  spyAll(instance);

  for (const method of DB_DEFAULT_REJECT_METHODS) {
    jest.spyOn(instance, method);
    instance?.[method]?.mockImplementation((...args: Array<any>) => Promise.reject(
      new NotImplementError(`db.run(${JSON.stringify(args)}) require manually mock the response`))
    );
  }

  for (const method of DB_DEFAULT_RESOLVE_METHODS) {
    jest.spyOn(instance, method);
    instance?.[method]?.mockResolvedValue(undefined);
  }

  return instance;
}

/**
 * create a dummy/mocked service instance without full cds framework
 * 
 * @param service 
 * @param options test options 
 * @deprecated try to use `cds-jest.dummy.DummyService` or `cds-jest.serve`
 * @returns 
 */
export async function Service<T = any>(service: string, options: TestOptions = {}): Promise<T> {
  const cds = cwdRequire("@sap/cds");
  const ServiceFactory = cwdRequire("@sap/cds/lib/serve/factory");
  const csn = await cds.load("*", Object.assign({}, cds.options, options));
  const _pending = cds.services._pending ?? {};
  let _done = (x: any) => x;
  if (service in cds.services) return cds.services[service];
  if (service in _pending) return _pending[service];
  _pending[service] = new Promise(r => _done = r).finally(() => {
    delete _pending[service];
  });
  const srv = new ServiceFactory(service, csn);
  srv.init && await srv.prepend(srv.init);
  srv.options.impl && await srv.prepend(srv.options.impl);
  srv.models = csn;
  spyAll(srv);
  if (service === "db") {
    cds.db = srv;
  }
  _done(cds.services[service] = srv);
  return srv;
}

/**
 * create an empty `cds.Service`, and spy all functions
 * 
 * @param name 
 * @param options 
 * @returns 
 */
export async function DummyService(name?: string, options?: any): Promise<any> {
  const cds = cwdRequireCDS();
  const model = await cds.load("*", options);
  const localOptions: any = { ...options, model };
  const inst = new cds.Service(name, model, localOptions);
  spyAll(inst);
  return inst;
}

/**
 * execute dummy `cds.serve`, but without express http server.
 * 
 * it will automatically connect to all application services
 * 
 * with 
 * * dummy database service (developer must mock all db executions)
 * 
 * spy
 * * application services
 * * database service
 */
export function serve(options: TestOptions = {}) {
  const cds = cwdRequireCDS();
  const db = cds.db = cds.services["db"] = new cds.Service("db");
  const run = db.run = jest.fn();

  beforeAll(async () => {
    const model = await cds.load("*", options);
    db.model = cds.model = (cds as any).compile.for.nodejs(model);
    await cds.serve("all", options).in({ use() { } });
    // spy all functions of application services
    for (const service of cds.services) {
      if (service instanceof cds.ApplicationService) {
        spyAll(service);
      }
    }
  });


  return run;

}


/**
 * dummy objects construction
 */
export const dummy = {
  DummyService, Database, Service, serve
};
