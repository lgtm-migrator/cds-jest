


describe('predefined.service Test Suite', () => {

  const path = require("path")
  const models = [path.join(__dirname, "./sample-app/srv")]
  const { when, errors, predefined } = require("../src")
  const spies = predefined.service(...models)
  const cds = require("@sap/cds")

  beforeAll(() => cds.connect.to("db"))

  afterEach(() => spies.clear())

  it('should support throw error when not mock value for "db.run"', async () => {
    const PersonService = await cds.connect.to("PersonService")
    expect(PersonService).not.toBeUndefined()
    const query = INSERT.into("Person").entries([{ Name: "Theo Sun" }])
    await expect(() => PersonService.run(query)).rejects.toThrowError(errors.NotImplementError)
  });

  it('should support connect and consume data', async () => {

    const db = await cds.connect.to("db")
    const PersonService = await cds.connect.to("PersonService")
    const query = INSERT.into("Person").entries([{ Name: "Theo Sun" }])

    when(db.run)
      .calledWith(expect.toMatchCQN(INSERT.into("PersonService.Person")), expect.anything())
      .mockResolvedValue(undefined)

    await PersonService.run(query) // execute request

    expect(db.run).toBeCalledWith(expect.toMatchCQN(INSERT.into("PersonService.Person")), expect.anything())

  });


  it('should support read with information', async () => {
    const db = await cds.connect.to("db")

    db.run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    db.run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

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
    const db = await cds.connect.to("db")

    db.run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    db.run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

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