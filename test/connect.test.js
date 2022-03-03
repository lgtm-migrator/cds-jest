

describe('Connect.to Test Suite', () => {

  it('should support connect to service (without full framework)', async () => {
    const { utils } = require("../src")
    const path = require("path")
    const models = [path.join(__dirname, "./sample-app/srv")]
    const personService = await utils.connect.to("PersonService", ...models)
    expect(personService).not.toBeUndefined()
    expect(personService.dummy()).toBe("dummy value")
    // require cds.db
    // await personService.run(INSERT.into("Person").entries([{ Name: "Theo" }]))
  });

  it('should support spy the "cds.connect.to"', async () => {
    const { spy, when } = require("../src")
    const spies = spy("connectTo")
    when(spies.connectTo)
      .calledWith("ps")
      .mockResolvedValue({ dummy: () => "dummy value ps" })
    when(spies.connectTo)
      .calledWith("ps2")
      .mockResolvedValue({ dummy: () => "dummy value ps2" })
    const cds = require("@sap/cds")
    const srv = await cds.connect.to("ps")
    expect(srv).not.toBeUndefined()
    expect(srv.dummy()).toBe("dummy value ps")
    expect((await cds.connect.to("ps2")).dummy()).toBe("dummy value ps2")
    spies.restore()
  });


});