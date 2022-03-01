# cds mock

> mock library for cds test, heavily depends on the `jest.spyOn`


## Get Started

> only support `jest` test framework

`a sample test case`

```js
const { mockCDS } = require("cds-mock")
// MUST put this line before `require("@sap/cds")`, so that the mock could be applied
const { executes } = mockCDS()
const cds = require("@sap/cds")
const axios = cds.test(".").in(__dirname, "../")

describe('CDS Test Suite', () => {

  it('should support mock db', async () => {
    expect(jest.isMockFunction(executes.select)).toBeTruthy()
    executes.select.mockClear()
    executes.select.mockImplementationOnce(() => [])

    const { data } = await axios.get("/class/Teachers")
    expect(data.value).toHaveLength(0) // the first time will return the mocked value

    const { data: data2 } = await axios.get("/class/Teachers")
    expect(data2.value).toHaveLength(2) // the second time will return the original implementation

    expect(executes.select).toHaveBeenCalledTimes(2) // verify called
  });

});

```

# Features

- [x] mock db executions
- [ ] mock db connection
- [ ] mock http
- [ ] mock user & privileges
- [ ] mock `cds.connect.to`
- [ ] mock express server and requests

## [LICENSE](./LICENSE)
