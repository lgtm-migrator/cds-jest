/* eslint-disable camelcase */
import { DB_DEFAULT_REJECT_METHODS, DB_DEFAULT_RESOLVE_METHODS } from "./constants";
import { NotImplementError } from "./errors";
import { DummyDatabase } from "./types";
import { cwdRequire, spyAll } from "./utils";

export async function Database(...models: Array<string>): Promise<jest.MockedObject<DummyDatabase>> {
  const cds = cwdRequire("@sap/cds");
  const Service = cwdRequire("@sap/cds/libx/_runtime/sqlite/Service");
  const instance = new Service("db", await cds.load(models));
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
 * create dummy/mocked service instance without full cds framework
 * 
 * @param service 
 * @param models 
 * @deprecated
 * @returns 
 */
export async function Service<T = any>(service: string, ...models: Array<string>): Promise<T> {
  const cds = cwdRequire("@sap/cds");
  const ServiceFactory = cwdRequire("@sap/cds/lib/serve/factory");
  const csn = await cds.load(models);
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
 * execute dummy `cds.serve`, but without express http server.
 * 
 * it will automatically connect to all application services
 * 
 * with 
 * * dummy database
 * 
 * spy
 * * application services
 * * database service
 */
export async function serve(...models: Array<string>) {
  const cds = cwdRequire("@sap/cds");
  const mockExpressApp = { use() { } }; // do nothing app
  const options = {
    port: "0",
    service: "all",
    from: cds.models = await cds.load(models),
    mocked: undefined,
    in_memory: true,
    "in-memory?": true,
  };

  const cdsServe = cwdRequire("@sap/cds/lib/serve");
  await cdsServe("all", options).in(mockExpressApp);

  // connect to db
  cds.db = cds.services["db"] = await dummy.Database(...models);

  spyAll(cds.services);

}


/**
 * dummy objects construction
 */
export const dummy = {
  Database, Service, serve
};