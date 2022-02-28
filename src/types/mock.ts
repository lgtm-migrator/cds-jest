

export type MockObjectWrapper<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? jest.MockedFunction<T[K]> : T[K]
} 
