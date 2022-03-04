

describe('HTTP Test Suite', () => {

  const cdsTest = require("@sap/cds").test(".").in(__dirname, "./sample-app")
  /**
   * @type {import("axios").AxiosInstance}
   */
  const axios = cdsTest.axios;

  it('should support mock http GET', async () => {
    const response = await axios.request({
      method: "GET",
      url: "/person/Person",
    })
    expect(response.status).toBe(200)
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


});