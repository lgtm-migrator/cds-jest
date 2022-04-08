const { getTestOptions } = require("./utils");



describe('predefined.service Test Suite', () => {
  const { when } = require("jest-when")
  const { errors, predefined } = require("../src") // use 'cds-jest' in your project
  const spies = predefined.service(getTestOptions())
  const cds = require("@sap/cds")

  afterEach(() => spies.clear()) // clear mock/spy objects called information

  it('will throw error when not mock value for "db.run"', async () => {
    await cds.connect.to("db")
    const PersonService = await cds.connect.to("PersonService")
    expect(PersonService).not.toBeUndefined()
    const query = INSERT.into("Person").entries([{ Name: "Theo Sun" }])
    await expect(() => PersonService.run(query))
      .rejects
      .toThrowError(errors.NotImplementError)
  });

  it('should support connect and consume data', async () => {

    const db = await cds.connect.to("db")
    const PersonService = await cds.connect.to("PersonService")
    const query = INSERT.into("Person").entries([{ Name: "Theo Sun" }])

    // conditionally mock, 

    // when insert to the `Person` table, return `undefined` value
    when(db.run)
      .calledWith(
        expect.toMatchCQN(INSERT.into("PersonService.Person")),
        expect.anything()
      )
      .mockResolvedValueOnce(undefined)

    const result = await PersonService.run(query) // execute request

    expect(result).toMatchObject({
      Name: "Theo Sun"
    })

    // expect
    expect(db.run)
      .toBeCalledWith(
        expect.toMatchCQN(INSERT.into("PersonService.Person")),
        expect.anything()
      )

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

    // connect to database to perform mock and spy, 
    // MUST, FIRSTLY, CONNECT TO DB, otherwise the framework will throw error say there is no db connection
    const db = await cds.connect.to("db")
    // mock return value
    db.run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    db.run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

    // connect to business service
    const PersonService = await cds.connect.to("PersonService")
    // execute CQN and trigger the events
    const result = await PersonService
      .run(SELECT.one.from("Person")
        .where({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f" }))

    // expect the result
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
