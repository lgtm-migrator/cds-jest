

describe("DB Test Suite", () => {

  const { utils } = require("../src");
  require("@sap/cds");
  const path = require("path");
  const models = [path.join(__dirname, "./sample-app/srv")];

  it("should support create mocked db instance", async () => {

    const db = await utils.db.dummy(models);
    expect(db).not.toBeUndefined();
    db.run.mockResolvedValue(undefined);
    expect(jest.isMockFunction(db._run)).toBeTruthy();
    expect(jest.isMockFunction(db.run)).toBeTruthy();
    expect(jest.isMockFunction(db.acquire)).toBeTruthy();
    await db.run(INSERT.into("Person").entries([{ Name: "Theo Sun" }]));

  });

});
