# cds mock

> mock library for cds test, heavily depends on the `jest.spyOn`


## Get Started

> only support `jest`

```js
const { mockCDS } = require("cds-mock")

describe('CDS Test Suite', () => {
  const { executes } = mockCDS()
  const cds = require("@sap/cds")
  const axios = cds.test(".").in(__dirname, "../")

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


## [LICENSE](./LICENSE)
