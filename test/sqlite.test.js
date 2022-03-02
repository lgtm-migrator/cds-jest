

describe('Sqlite Mock Test Suite', () => {

  const { mockCDS, mockUtils } = require("../src")

  const { when } = require("jest-when")

  const mocks = mockCDS("sqlite")
  const cds = require("@sap/cds")
  const axios = cds.test(".").in(__dirname, "./sample-app")

  beforeEach(() => {
    mocks.clear()
    mockUtils.disable.db.tx(mocks)
  })

  it('should support get metadata', async () => {
    const res = await axios.get("/person/$metadata")
    expect(res.data).toMatch(/Person/)
  });

  it('should support mock query', async () => {
    mocks.sqlite.select.mockResolvedValueOnce([{ Name: 'Theo Sun', Age: 19 }])
    const res = await axios.get("/person/Person")
    expect(res.data?.value?.[0]).toMatchObject({ Name: 'Theo Sun', Age: 19 })
    const res2 = await axios.get("/person/Person")
    expect(res2.data?.value).toHaveLength(0)
  });

  it('should support mock insert', async () => {

    mocks.sqlite.insert.mockResolvedValueOnce([{ lastID: 'testId', affectedRows: 1 }])
    const res = await axios.post("/person/Person", { Name: "people12312", Age: 99 })
    expect(res.data).toMatchObject({ Name: "people12312", Age: 99 })

  });

  it('should support mock delete', async () => {
    mocks.sqlite.delete.mockResolvedValueOnce(undefined)
    const res = await axios.delete("/person/Person(aaf5dcb7-0c5b-494b-81f8-54dc5ff4c7e3)")
    expect(res.status).toBe(204)

    // raw deletion
    await expect(() => axios.delete("/person/Person(aaf5dcb7-0c5b-494b-81f8-54dc5ff4c7e3)")).rejects.toThrowError("404 - Not Found")
  });

});