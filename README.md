# cds jest

> jest utils for `cds`

[![npm](https://img.shields.io/npm/v/cds-jest)](https://www.npmjs.com/package/cds-jest)
[![node-test](https://github.com/Soontao/cds-jest/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Soontao/cds-jest/actions/workflows/nodejs.yml)
[![codecov](https://codecov.io/gh/Soontao/cds-jest/branch/main/graph/badge.svg?token=WFDumlSg3G)](https://codecov.io/gh/Soontao/cds-jest)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/cds-jest)

## Get Started

> setup `jest` test cases for cds project with `cds-jest` 

### Quick View

```js
describe('dummy.serve Test Suite', () => {

  const { serve, errors, when, utils } = require("cds-jest");
  const cds = require("@sap/cds");
  const path = require("path")
  const model = path.join(__dirname, "./sample-app/srv")

  beforeAll(() => serve(model))

  it('should support read with information', async () => {

    const db = await cds.connect.to("db")
    // mock return value
    utils.mustJestMock(db.run).mockResolvedValueOnce({ ID: "6fb19609-dfed-4be7-a935-66ea4338c13f", Name: "TheoSun" })
    utils.mustJestMock(db.run).mockResolvedValueOnce([{ Label: "21312", Value: "fjdkaslfjasdklfjasdklf" }])

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
      .mockResolvedValue(undefined)

    await PersonService.run(query) // execute request

    // expect
    expect(db.run)
      .toBeCalledWith(
        expect.toMatchCQN(INSERT.into("PersonService.Person")),
        expect.anything()
      )

  });

});
```

### Samples

1. [test with service layer](./test/serve.test.js)
     1. without `express` server setup
     2. with a dummy mock database, you must provide each database execution
     3. automatically connect to all application services
2. [test with framework layer](./test/predefined.http.test.js)
     1. with `express` server and middlewares
     2. with default `sqlite` database but you can mock values conditionally

## Features

- [x] mock db executions
  - [ ] db execution shortcut
- [x] mock db service for `cds.connect.to`
- [x] hack `cds_serve`, use the native serve logic to test
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

## [CHANGELOG](./CHANGELOG.md)

## [LICENSE](./LICENSE)
