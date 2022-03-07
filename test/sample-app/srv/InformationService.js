
module.exports = class InformationService extends cds.ApplicationService {

  async init() {
    this.before("CREATE", "Information", (req) => {
      if (req.data.Value.length < 10) {
        return req.reject(400, "VALUE_LEN_NOT_ENOUGH")
      }
      return
    })

    this.on("user", (req) => {
      return {
        isAdmin: req.user.is("admin"),
        emailAddress: req.user.attr.email,
      }
    })
    
    await super.init()
  }

}