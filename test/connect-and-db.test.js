const { getTestOptions } = require("./utils");



describe('connect.to and db Test Suite', () => {
  const { when } = require("jest-when")
  const { utils, spy, errors } = require("../src")
  const cds = require("@sap/cds")
  const options = getTestOptions()
  const spies = spy("connect")

  /**
   * @type {jest.MockedObject<import("../src/types").DummyDatabase>}
   */
  let dummyDatabaseService

  beforeAll(async () => {
    utils.connect.deep(spies, options)
    // must assign to cds.db as a global referenec to execute CQN
    dummyDatabaseService = await utils.db.dummy(options)
  })

  afterEach(() => {
    dummyDatabaseService.run.mockClear()
  })

  it('should support throw error when not mock value for "db.run"', async () => {

    const PersonService = await cds.connect.to("PersonService")
    expect(PersonService).not.toBeUndefined()
    const query = INSERT.into("Person").entries([{ Name: "Theo Sun" }])
    await expect(() => PersonService.run(query)).rejects.toThrowError(errors.NotImplementError)
  });

  it('should support connect and consume data', async () => {

    const PersonService = await cds.connect.to("PersonService")
    const query = INSERT.into("Person").entries([{ Name: "Theo Sun" }])

    when(dummyDatabaseService.run)
      .calledWith(expect.toMatchCQN(INSERT.into("PersonService.Person")), expect.anything())
      .mockResolvedValue(undefined)

    await PersonService.run(query) // execute request

    expect(dummyDatabaseService.run).toBeCalledWith(expect.toMatchCQN(INSERT.into("PersonService.Person")), expect.anything())

  });


  it('should support read with information', async () => {

    dummyDatabaseService.run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    dummyDatabaseService.run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

    const PersonService = await cds.connect.to("PersonService")
    const result = await PersonService.run(SELECT.one.from("Person").where({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f" }))
    expect(result)
      .toMatchObject({
        ID: "6fb19609-dfed-4be7-a935-66ea4338c13f",
        Name: "TheoSun",
        Informations: [
          { Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }
        ]
      })

  });

  it('should support read with information', async () => {

    dummyDatabaseService.run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    dummyDatabaseService.run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

    const PersonService = await cds.connect.to("PersonService")
    const result = await PersonService.run(SELECT.one.from("Person").where({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f" }))

    expect(result)
      .toMatchObject({
        ID: "6fb19609-dfed-4be7-a935-66ea4338c13f",
        Name: "TheoSun",
        Informations: [
          { Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }
        ]
      })

  });



});
