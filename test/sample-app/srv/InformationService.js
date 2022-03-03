
module.exports = class InformationService extends cds.ApplicationService {

  async init() {
    this.before("CREATE", "Information", (req) => {
      if (req.data?.Value?.length < 10) {
        return req.reject(400, "VALUE_LEN_NOT_ENOUGH")
      }
      return
    })
    await super.init()
  }

}