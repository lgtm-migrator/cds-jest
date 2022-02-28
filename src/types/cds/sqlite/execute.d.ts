import { Readable } from "stream";

declare function executeDeleteCQN(
  model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any): Promise<any>;

declare function executeInsertCQN(
  model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any): Promise<any>;

declare function executeUpdateCQN(
  model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any): Promise<any>;

declare function executeSelectCQN(
  model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any): any;

declare function executeSelectStreamCQN(
  model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any): Promise<{
  value: Readable;
}>;

declare function executeGenericCQN(
  model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any): Promise<any>;

declare function executePlainSQL(
  dbc: any, sql: any, values: any, isOne: any, postMapper: any): Promise<any>;

export {
  executeDeleteCQN as delete,
  executeInsertCQN as insert,
  executeUpdateCQN as update,
  executeSelectCQN as select,
  executeSelectStreamCQN as stream,
  executeGenericCQN as cqn,
  executePlainSQL as sql
};
