


describe('connect.to and db Test Suite', () => {
  
  const { utils, spy, when } = require("../src")
  const cds = require("@sap/cds")
  const path = require("path")
  const models = [path.join(__dirname, "./sample-app/srv")]
  const spies = spy("connect")
  /**
   * @type {jest.MockedObject<import("../src/types").DummyDatabase>}
   */
  let db

  beforeAll(async () => {
    utils.connect.fullMock(spies, ...models)
    db = cds.db = await utils.db.dummy(models)
  })

  beforeEach(() => {
    cds.db.run.mockClear()
  })

  it('should support connect and consume data', async () => {

    const PersonService = await cds.connect.to("PersonService")
    expect(PersonService).not.toBeUndefined()
    const query = INSERT.into("Person").entries([{ Name: "Theo Sun" }])
    await PersonService.run(query)
    expect(db.run).toBeCalledWith(expect.toMatchCQN(INSERT.into("PersonService.Person")), expect.anything())

  });


  it('should support read with information', async () => {
    db.run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    db.run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])
    const PersonService = await cds.connect.to("PersonService")
    const result = await PersonService.run(SELECT.one.from("Person").where({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f" }))
    expect(result).toMatchObject({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
  });



});