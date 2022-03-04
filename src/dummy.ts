import { DB_DEFAULT_REJECT_METHODS, DB_DEFAULT_RESOLVE_METHODS } from "./constants";
import { NotImplementError } from "./errors";
import { DummyDatabase } from "./types";
import { cwdRequire, spyAll } from "./utils";


/**
 * dummy objects construction
 */
export const dummy = {

  async Database(...models: Array<string>): Promise<jest.MockedObject<DummyDatabase>> {
    const cds = cwdRequire("@sap/cds")
    const Service = cwdRequire("@sap/cds/libx/_runtime/sqlite/Service");
    const instance = new Service("db", await cds.load(models))
    instance.init && await instance.init()
    spyAll(instance)

    for (const method of DB_DEFAULT_REJECT_METHODS) {
      jest.spyOn(instance, method)
      instance?.[method]?.mockImplementation((...args: Array<any>) => Promise.reject(
        new NotImplementError(`db.run(${JSON.stringify(args)}) require manually mock the response`))
      )
    }

    for (const method of DB_DEFAULT_RESOLVE_METHODS) {
      jest.spyOn(instance, method)
      instance?.[method]?.mockResolvedValue(undefined)
    }

    return instance
  },

  /**
   * create dummy/mocked service instance without full cds framework
   * 
   * @param service 
   * @param models 
   * @returns 
   */
  async Service<T = any>(service: string, ...models: Array<string>): Promise<T> {
    const cds = cwdRequire("@sap/cds")
    const ServiceFactory = cwdRequire("@sap/cds/lib/serve/factory")
    const csn = await cds.load(models)
    const srv = new ServiceFactory(service, csn)
    srv.init && await srv.prepend(srv.init)
    srv.options.impl && await srv.prepend(srv.options.impl)
    srv.models = csn
    spyAll(srv)
    return srv
  }
  
}