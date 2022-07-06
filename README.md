# cds jest

> jest utils for `cds`

[![npm](https://img.shields.io/npm/v/cds-jest)](https://www.npmjs.com/package/cds-jest)
[![node-test](https://github.com/Soontao/cds-jest/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Soontao/cds-jest/actions/workflows/nodejs.yml)
[![codecov](https://codecov.io/gh/Soontao/cds-jest/branch/main/graph/badge.svg?token=WFDumlSg3G)](https://codecov.io/gh/Soontao/cds-jest)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/cds-jest)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Soontao_cds-jest&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Soontao_cds-jest)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Soontao_cds-jest&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Soontao_cds-jest)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Soontao_cds-jest&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Soontao_cds-jest)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Soontao_cds-jest&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Soontao_cds-jest)

## Get Started

> setup `jest` test cases for cds project with `cds-jest` 

### Quick View

```js
describe('serve Test Suite', () => {

  const { serve } = require("cds-jest");
  const cds = require("@sap/cds");
  const run = serve()

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

    expect(run.mock.lastCall).toMatchInlineSnapshot(`
Array [
  INSERT {
    "INSERT": Object {
      "entries": Array [
        Object {
          "ID": "773096ac-63fb-4943-8a45-5b3837a9ed8e",
          "Name": "Theo Sun",
        },
      ],
      "into": "PersonService.Person",
    },
  },
  Object {
    "ID": "773096ac-63fb-4943-8a45-5b3837a9ed8e",
    "Name": "Theo Sun",
  },
]
`)

  });

});


```

### Samples

1. [test with service layer](./test/serve.test.js)
     1. without `express` server setup
     2. with a dummy mock database, you should provide the mock value for each database execution
     3. automatically connect to all application services
2. [test with framework layer](./test/predefined.http.test.js)
     1. with `express` server and middlewares
     2. with default `sqlite` database but you can mock values conditionally

## Features

- [x] hack `serve`, use the native serve logic to test
  - [ ] partial `serve`
- [ ] custom CQN matcher
  - [x] basic table matcher
  - [ ] axios response matcher (response code, body)
- [ ] cds test wrapper (with axios type definition)

## [CHANGELOG](./CHANGELOG.md)

## [LICENSE](./LICENSE)
