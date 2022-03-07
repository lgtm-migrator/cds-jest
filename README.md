# cds jest

> jest utils for `cds`

[![node-test](https://github.com/Soontao/cds-jest/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Soontao/cds-jest/actions/workflows/nodejs.yml)
[![codecov](https://codecov.io/gh/Soontao/cds-jest/branch/main/graph/badge.svg?token=WFDumlSg3G)](https://codecov.io/gh/Soontao/cds-jest)

## Get Started

### Quick View

```js
describe('predefined.service Test Suite', () => {

  const path = require("path")
  const models = [path.join(__dirname, "./sample-app/srv")]
  const { when, errors, predefined } = require("cds-jest")
  const spies = predefined.service(...models)
  const cds = require("@sap/cds")

  afterEach(() => spies.clear())

  it('should support read with information', async () => {

    // connect to database to perform mock and spy, 
    // MUST, FIRSTLY, CONNECT TO DB, 
    // otherwise the framework will throw error say that there is no db connection
    const db = await cds.connect.to("db")
    // mock return value
    db.run.mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    db.run.mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

    // connect to business service
    const PersonService = await cds.connect.to("PersonService")
    // execute CQN and trigger the events
    const result = await PersonService
      .run(SELECT.one.from("Person").where({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f" }))

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
```

### Samples

1. [test with service layer](./test/predefined.http.test.js)
     1. without `express` server setup
     2. without database
     3. pure service handlers, cascade `cds.connect.to`
2. [test with framework layer](./test/predefined.service.test.js)
     1. with `express` server and middlewares
     2. with default `sqlite` database but you can mock values conditionally

## Features

- [x] mock db executions
  - [ ] db execution shortcut
- [x] mock db service for `cds.connect.to`
- [x] mock user attr & privileges
- [x] mock `cds.connect.to`
  - [x] test with odata lifecycle
  - [x] simple `connect.to`
  - [x] cascade `connect.to`
  - [ ] circular `connect.to`
  - [ ] test with action/function
  - [x] cds.services alias
- [ ] spy logger
- [ ] custom CQN matcher
  - [x] basic table matcher
  - [ ] axios response matcher (response code, body)
- [ ] cds test wrapper (with axios type definition)

## [LICENSE](./LICENSE)
