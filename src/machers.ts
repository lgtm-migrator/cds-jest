/* eslint-disable max-len */

function toMatchCQN(receivedCQN: any, expectedCQN: any) {

  const result = {
    message: () => `expected: ${JSON.stringify(expectedCQN)}${result.pass ? " " : " not "}to be received: ${JSON.stringify(receivedCQN)}`,
    pass: false
  };

  if (receivedCQN === expectedCQN) {
    result.pass = true;
    return result;
  }

  // any one of value is undefined
  if (receivedCQN === undefined || expectedCQN === undefined) {
    return result;
  }

  if (receivedCQN.SELECT !== undefined && expectedCQN.SELECT !== undefined) {
    if (receivedCQN.SELECT?.from?.ref[0] === expectedCQN.SELECT.from?.ref?.[0]) {
      result.pass = true;
      return result;
    }
  }

  if (receivedCQN.INSERT !== undefined && expectedCQN.INSERT !== undefined) {
    if (receivedCQN.INSERT.into === expectedCQN.INSERT.into) {
      result.pass = true;
      return result;
    }
  }

  if (receivedCQN.UPDATE !== undefined && expectedCQN.UPDATE !== undefined) {
    if (receivedCQN.UPDATE.entity === expectedCQN.UPDATE.entity) {
      result.pass = true;
      return result;
    }
  }

  if (receivedCQN.DELETE !== undefined && expectedCQN.DELETE !== undefined) {
    if (receivedCQN.DELETE.from === expectedCQN.DELETE.from) {
      result.pass = true;
      return result;
    }
  }

  return result;

};

expect.extend({ toMatchCQN });

interface CustomMatchers<R = unknown> {
  /**
   * match cqn structures
   * 
   * supported fields 
   * 
   * * table/entity name
   * 
   * @param expectedCQN 
   */
  toMatchCQN(expectedCQN: any): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers { }
    interface Matchers<R> extends CustomMatchers<R> { }
    interface InverseAsymmetricMatchers extends CustomMatchers { }
  }
}

export { };
