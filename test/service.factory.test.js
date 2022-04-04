const { getTestOptions } = require("./utils");


describe('Service Factory Test Suite', () => {
  const { dummy } = require("../src")

  it('should support connect to service with Service Factory (without full framework)', async () => {

    const srv = await dummy.Service("InformationService", getTestOptions())

    expect(() => srv.run(INSERT.into("Information").entries([{ Label: "1", Value: "10" }])))
      .rejects
      .toThrowError("VALUE_LEN_NOT_ENOUGH")

    expect(() => srv.run(INSERT.into("Information").entries([{ Label: "1", Value: "100000000000000" }])))
      .rejects
      .toThrowError("NO_DATABASE_CONNECTION")

  });

  it('should support create dummy service', async () => {
    const srv = await dummy.DummyService("InformationService", getTestOptions())
    await expect(() => srv.run(INSERT.into("Information").entries([{ Label: "1", Value: "10" }])))
      .rejects
      .toThrow(`Service "InformationService" has no handler for "CREATE InformationService.Information"`)
  });

});
