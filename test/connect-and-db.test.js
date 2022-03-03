


describe('connect.to and db Test Suite', () => {
  const { utils, spy, when } = require("../src")
  const cds = require("@sap/cds")
  const path = require("path")
  const models = [path.join(__dirname, "./sample-app/srv")]
  const spies = spy("connect")

  beforeAll(async () => {
    spies.connect.to.mockImplementation((service) => utils.connect.to(service, ...models))
    cds.db = await utils.db.dummy(models)
  })

  it('should support connect and consume data', async () => {
    const PersonService = await cds.connect.to("PersonService")
    expect(PersonService).not.toBeUndefined()
    const query = INSERT.into("Person").entries([{ Name: "Theo Sun" }])
    await PersonService.run(query)
    expect(cds.db.run).toBeCalledWith(expect.toMatchCQN(INSERT.into("PersonService.Person")), expect.anything())

  });



});