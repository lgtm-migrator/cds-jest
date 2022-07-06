/**
 * assert giving function is a mock function, if not, will throw error
 * 
 * @param f a function
 * @returns 
 */
export const mustJestMock = <T extends (...args: any[]) => any>(f: T): jest.MockedFunction<T> => {
  if (!jest.isMockFunction(f)) {
    throw new TypeError("assert: is jest mock function");
  }
  return f as any;
};

/**
 * spy all functions on object
 * 
 * @param object 
 * @param accessType 
 * @returns 
 */
export const spyAll = <T extends object>(obj: T, accessType?: "get" | "set") => {
  const spiedObject: any = {};
  if (typeof obj === "object") {
    for (const f of getAllFunctions(obj)) {
      spiedObject[f] = jest.spyOn(obj, f as any, accessType as any);
    }
  }
  return spiedObject;
};

/**
 * get all functions of object (with prototype)
 * 
 * @param object 
 * @returns 
 */
export const getAllFunctions = (object: any): Array<string> => {
  const props = new Set<string>();
  let obj = object;
  do {
    for (const attr of Object.getOwnPropertyNames(obj)) {
      props.add(attr);
    }
  } while (obj = Object.getPrototypeOf(obj));
  return Array.from(props).sort().filter((e: any) => typeof object[e] === "function");
};

/**
 * cds mock/spy utils
 */
export const utils = {
  mustJestMock,
};
