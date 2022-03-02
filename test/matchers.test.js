

describe('Machers Test Suite', () => {

  require("../src") // register machers
  require("@sap/cds")

  it('should support basic match CQN table', () => {
    expect(SELECT.from("table1")).toMatchCQN(SELECT.from("table1"))
    expect(UPDATE("table1")).toMatchCQN(UPDATE("table1"))
    expect(UPDATE("table1")).not.toMatchCQN(UPDATE("table2"))
    expect(INSERT.into("table1")).toMatchCQN(INSERT.into("table1"))
    expect(DELETE.from("table1")).toMatchCQN(DELETE.from("table1"))
  });
  
});