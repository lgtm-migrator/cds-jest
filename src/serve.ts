/* eslint-disable camelcase */
import { cwdRequire, cwdRequireCDS } from "cds-internal-tool";
import { spyAll } from "./utils";
/**
 * 
 * execute dummy `cds.serve`, but without express http server.
 * 
 * it will automatically connect to all application services
 * 
 * @returns the mocked `cds.db.run` function
 * 
 */
export function serve(options: any = {}) {
  const cds = cwdRequireCDS();
  const DatabaseService = cwdRequire("@sap/cds/libx/_runtime/sqlite/Service");
  const db = cds.db = cds.services["db"] = new DatabaseService("db");
  const run = db.run = jest.fn();

  beforeAll(async () => {
    const model = await cds.load("*", options);
    db.model = cds.model = (cds as any).compile.for.nodejs(model);
    await cds.serve("all", options);
    // spy all functions of application services
    for (const service of cds.services) {
      if (service instanceof cds.ApplicationService) {
        spyAll(service);
      }
    }
  });


  return run;

}
