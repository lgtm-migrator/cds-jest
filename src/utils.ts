
export const spyAll = <T>(object: T, accessType?: "get" | "set") => {
  Object.keys(object).forEach(key => {
    // @ts-ignore
    jest.spyOn(object, key, accessType);
  });
  return object;
};
