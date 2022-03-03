

describe('Service Factory Test Suite', () => {

  const path = require("path")
  const models = [path.join(__dirname, "./sample-app/srv")]

  it('should support connect to service with Service Factory (without full framework)', async () => {
    const { utils } = require("../src")
    const personService = await utils.connect.to("PersonService", ...models)
    expect(personService).not.toBeUndefined()
    expect(personService.dummy()).toBe("dummy value")
    // require cds.db
    // await personService.run(INSERT.into("Person").entries([{ Name: "Theo" }]))
  });

});