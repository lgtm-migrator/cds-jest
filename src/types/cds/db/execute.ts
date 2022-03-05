/* eslint-disable max-len */
import type { Readable } from "stream";

export type executeDeleteCQN = (model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any) => Promise<any>;

export type executeInsertCQN = (model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any) => Promise<[{
  lastID: any, affectedRows: number, values?: any
}]>;

export type executeUpdateCQN = (model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any) => Promise<any>;

export type executeSelectCQN = (model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any) => any | Array<any>;

export type executeSelectStreamCQN = (model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any) => Promise<{ value: Readable; }>;

export type executeGenericCQN = (model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any) => Promise<any>;

export type executePlainSQL = (dbc: any, sql: any, values?: any, isOne?: any, postMapper?: any) => Promise<any>;

export type executes = {
  /**
   * 
   * mock delete execution
   * 
   * @example
   * ```ts
   * mocks.sqlite.delete.mockResolvedValueOnce(undefined)
   * ```
   */
  delete: executeDeleteCQN,
  /**
   * 
   * the return value is not important, if no result for inserted value, the CAP framework will use in-memory one
   * 
   * @example
   * 
   * ```ts
   * mocks.sqlite.insert.mockReturnValueOnce(Promise.resolve([{ lastID: 'testId', affectedRows: 1 }]))
   * ```
   */
  insert: executeInsertCQN,
  update: executeUpdateCQN,
  /**
   * return select object list/item
   */
  select: executeSelectCQN,
  stream: executeSelectStreamCQN,
  cqn: executeGenericCQN,
  /**
   * mock simple SQL for deletion
   */
  sql: executePlainSQL
}
