

describe('Service Factory Test Suite', () => {

  const path = require("path")
  const models = [path.join(__dirname, "./sample-app/srv")]

  it('should support connect to service with Service Factory (without full framework)', async () => {
    const { dummy } = require("../src")

    const srv = await dummy.Service("InformationService", ...models)

    expect(() => srv.run(INSERT.into("Information").entries([{ Label: "1", Value: "10" }])))
      .rejects
      .toThrowError("VALUE_LEN_NOT_ENOUGH")

    expect(() => srv.run(INSERT.into("Information").entries([{ Label: "1", Value: "100000000000000" }])))
      .rejects
      .toThrowError("NO_DATABASE_CONNECTION")

  });

});