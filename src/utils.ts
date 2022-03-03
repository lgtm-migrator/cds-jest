
/**
 * resolve module by current work-space
 * 
 * @param id 
 * @returns 
 */
export const cwdResolve = (id: string) => {
  return require.resolve(id, { paths: [process.cwd()] })
}

/**
 * require module from current work-space instead of module 
 * 
 * @param id 
 * @returns 
 */
export const cwdRequire = (id: string) => {
  return require(cwdResolve(id));
};

/**
 * spy all functions on object
 * 
 * @param object 
 * @param accessType 
 * @returns 
 */
export const spyAll = <T extends object>(obj: T, accessType?: "get" | "set") => {
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      // @ts-ignore
      if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] === "function") {
        // @ts-ignore
        jest.spyOn(obj, key, accessType);
      }
    });
  }
  return obj;
};
