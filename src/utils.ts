
/**
 * require module from current work-space instead of module 
 * 
 * @param id 
 * @returns 
 */
export const cwdRequire = (id: string) => {
  return require(require.resolve(id, { paths: [process.cwd()] }));
};

/**
 * spy all functions on object
 * 
 * @param object 
 * @param accessType 
 * @returns 
 */
export const spyAll = <T extends object>(obj: T, accessType?: "get" | "set") => {
  Object.keys(obj).forEach(key => {
    // @ts-ignore
    if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] === "function") {
      // @ts-ignore
      jest.spyOn(obj, key, accessType);
    }
  });
  return obj;
};
