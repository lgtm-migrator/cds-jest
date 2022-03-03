

describe('Connect.to Test Suite', () => {

  const path = require("path")
  const models = [path.join(__dirname, "./sample-app/srv")]
  const { spy, when, utils } = require("../src")
  const spies = spy("connect")
  const cds = require("@sap/cds")

  it('should support spy the "cds.connect.to"', async () => {

    when(spies.connect.to)
      .calledWith("ps")
      .mockResolvedValue({ dummy: () => "dummy value ps" })
    when(spies.connect.to)
      .calledWith("ps2")
      .mockResolvedValue({ dummy: () => "dummy value ps2" })


    const srv = await cds.connect.to("ps")
    expect(srv).not.toBeUndefined()
    expect(srv.dummy()).toBe("dummy value ps")
    expect((await cds.connect.to("ps2")).dummy()).toBe("dummy value ps2")

  });

  it('should support overwrite defualt impl by "cds.connect.to"', async () => {
    // overwrite default implementation
    spies.connect.to.mockImplementation((service) => utils.connect.to(service, ...models))

    const aPersonService = await cds.connect.to("PersonService")
    expect(aPersonService).not.toBeUndefined()
    expect(aPersonService.dummy()).toBe("dummy value")
  });


  it.skip('should support run CQN in service', async () => {

    // overwrite default implementation
    spies.connect.to.mockImplementation((service) => utils.connect.to(service, ...models))

    const aPersonService = await cds.connect.to("PersonService")
    await aPersonService.run(INSERT.into("Person").entries([{ Name: "Theo Sun" }])) // TODO: cds.db is required for this execution

  });


});