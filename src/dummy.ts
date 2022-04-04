/* eslint-disable camelcase */
import { DB_DEFAULT_REJECT_METHODS, DB_DEFAULT_RESOLVE_METHODS } from "./constants";
import { NotImplementError } from "./errors";
import { DummyDatabase, TestOptions } from "./types";
import { cwdRequire, spyAll } from "./utils";

export async function Database(options: TestOptions = {}): Promise<jest.MockedObject<DummyDatabase>> {
  const cds = cwdRequire("@sap/cds");
  const Service = cwdRequire("@sap/cds/libx/_runtime/sqlite/Service");
  const instance = new Service("db", await cds.load("*", Object.assign({}, cds.options, options)));
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
export async function serve(options: TestOptions = {}) {
  const cds = cwdRequire("@sap/cds");
  const mockExpressApp = { use() { } }; // do nothing app
  const localOptions: any = {
    ...options,
    from: cds.models = await cds.load("*", options)
  };

  const cdsServe = cwdRequire("@sap/cds/lib/serve");
  await cdsServe("all", options).in(mockExpressApp);

  // connect to db
  cds.db = cds.services["db"] = await dummy.Database(localOptions);

  spyAll(cds.services);

}


/**
 * dummy objects construction
 */
export const dummy = {
  Database, Service, serve
};
