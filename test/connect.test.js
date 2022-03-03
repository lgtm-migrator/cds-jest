

describe('Connect.to Test Suite', () => {

  const { mockUtils } = require("../src")
  const path = require("path")
  const models = [
    path.join(__dirname, "./sample-app/srv")
  ]

  it('should support connect to service', async () => {
    const personService = await mockUtils.connect.to("PersonService", ...models)
    expect(personService).not.toBeUndefined()
    expect(personService.dummy()).toBe("dummy value")
    // require cds.db
    // await personService.run(INSERT.into("Person").entries([{ Name: "Theo" }]))
  });

});