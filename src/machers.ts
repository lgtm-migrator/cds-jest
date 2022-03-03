
function toMatchCQN(receivedCQN: any, expecetedCQN: any) {

  const result = {
    message: () => `expected: ${JSON.stringify(expecetedCQN)}${result.pass ? ' ' : ' not '}to be received: ${JSON.stringify(receivedCQN)}`,
    pass: false
  }

  if (receivedCQN === expecetedCQN) {
    result.pass = true
    return result
  }

  if (receivedCQN.SELECT !== undefined && expecetedCQN.SELECT !== undefined) {
    if (receivedCQN.SELECT?.from?.ref[0] === expecetedCQN.SELECT.from?.ref?.[0]) {
      result.pass = true
      return result
    }
  }

  if (receivedCQN.INSERT !== undefined && expecetedCQN.INSERT !== undefined) {
    if (receivedCQN.INSERT.into === expecetedCQN.INSERT.into) {
      result.pass = true
      return result
    }
  }

  if (receivedCQN.UPDATE !== undefined && expecetedCQN.UPDATE !== undefined) {
    if (receivedCQN.UPDATE.entity === expecetedCQN.UPDATE.entity) {
      result.pass = true
      return result
    }
  }

  if (receivedCQN.DELETE !== undefined && expecetedCQN.DELETE !== undefined) {
    if (receivedCQN.DELETE.from === expecetedCQN.DELETE.from) {
      result.pass = true
      return result
    }
  }

  return result;

};

export const matchers = {

}


expect.extend({ toMatchCQN })

interface CustomMatchers<R = unknown> {
  /**
   * match cqn structures
   * 
   * supported fields 
   * 
   * * table
   * 
   * @param receivedCQN 
   * @param expecetedCQN 
   */
  toMatchCQN(expecetedCQN: any): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers { }
    interface Matchers<R> extends CustomMatchers<R> { }
    interface InverseAsymmetricMatchers extends CustomMatchers { }
  }
}