

describe('HTTP Test Suite', () => {
  
  /**
   * @type {import("../src/types/cds").Test}
   */
  const server = require("@sap/cds").test(".").in(__dirname, "./sample-app")
  const axios = server.axios;
  const spies = require("../src").predefined.server()
  const { when } = require("jest-when");

  afterEach(() => spies.clear())

  it('should support mock http GET', async () => {
    const response = await axios.request({
      method: "GET",
      url: "/person/Person",
    })
    expect(response.status).toBe(200)
    expect(response.data.value).toHaveLength(0)
  });

  it('should support mock http GET with mock db result', async () => {
    // TODO: document that only use 'Once' functions
    spies.sqliteExecution.select.mockResolvedValueOnce([{ Name: 'Theo Sun' }])
    const response = await axios.request({
      method: "GET",
      url: "/person/Person",
    })
    expect(response.status).toBe(200)
    expect(response.data.value).toHaveLength(1)
  });

  it('should support mock http GET with mock db result, but not match entity', async () => {
    // TODO: fix restore not work
    const response = await axios.request({
      method: "GET",
      url: "/person/Person",
    })
    expect(response.status).toBe(200)
    expect(response.data.value).toHaveLength(0)
  });

  it('should support mock http POST', async () => {
    const response = await axios.request({
      method: "POST",
      url: "/person/Person",
      data: {
        Name: "Theo 111",
        Age: 999,
      }
    })

    expect(response.status).toBe(201)
  });


  it('should support mock user information', async () => {
    // if you want to mock the locale, just the the 'sap-language' at header
    // * req.query['sap-language']
    // * req.headers['x-sap-request-language']
    // * req.headers['accept-language']

    spies.user.attr.mockReturnValueOnce({ email: 'theo.sun@dummy.com' })
    when(spies.user.is).calledWith("admin").mockReturnValueOnce(true)

    const response = await axios.get("/info/user()")

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      isAdmin: true,
      emailAddress: 'theo.sun@dummy.com'
    })

    const response2 = await axios.get("/info/user()")
    expect(response2.status).toBe(200)
    expect(response2.data).toMatchObject({
      isAdmin: false,
      emailAddress: null
    })
  });

});