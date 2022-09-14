const { getTestOptions } = require("./utils");


describe('serve Test Suite', () => {

  const { serve } = require("../src");
  const cds = require("@sap/cds");
  const run = serve(getTestOptions())

  it('should support connect to simple service', async () => {
    const ps = await cds.connect.to("PersonService")
    expect(ps).toBeInstanceOf(cds.Service)
    expect(ps).not.toBeUndefined()
    expect(jest.isMockFunction(ps.run)).toBeTruthy() // is spied function
  });

  it('should support connect and consume data', async () => {

    const PersonService = await cds.connect.to("PersonService")
    const query = INSERT.into("Person").entries([{ ID: "773096ac-63fb-4943-8a45-5b3837a9ed8e", Name: "Theo Sun" }])

    const result = await PersonService.run(query) // execute request

    expect(result).toMatchObject({
      Name: "Theo Sun"
    })

    // expect
    expect(run.mock.lastCall).toMatchInlineSnapshot(`
[
  INSERT {
    "INSERT": {
      "entries": [
        {
          "ID": "773096ac-63fb-4943-8a45-5b3837a9ed8e",
          "Name": "Theo Sun",
        },
      ],
      "into": "PersonService.Person",
    },
  },
  {
    "ID": "773096ac-63fb-4943-8a45-5b3837a9ed8e",
    "Name": "Theo Sun",
  },
]
`)

  });


  it('should support read with information', async () => {
    run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

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
    // mock return value
    run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

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

  it('should support trigger the action/function (basic)', async () => {
    const InformationService = await cds.connect.to("InformationService")
    const info = await InformationService.user()
    expect(info).not.toBeUndefined()
  });

});
