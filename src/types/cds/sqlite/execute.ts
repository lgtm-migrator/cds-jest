import { Readable } from "stream";

export type executeDeleteCQN = (
  model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any) => Promise<any>;

export type executeInsertCQN = (
  model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any) => Promise<any>;

export type executeUpdateCQN = (
  model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any) => Promise<any>;

export type executeSelectCQN = (
  model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any) => any;

export type executeSelectStreamCQN = (
  model: any, dbc: any, query: any, user: any, locale: any, txTimestamp: any) => Promise<{
  value: Readable;
}>;

export type executeGenericCQN = (
  model: any, dbc: any, cqn: any, user: any, locale: any, txTimestamp: any) => Promise<any>;

export type executePlainSQL = (
  dbc: any, sql: any, values: any, isOne: any, postMapper: any) => Promise<any>;

export type executes = {
  delete: executeDeleteCQN,
  insert: executeInsertCQN,
  update: executeUpdateCQN,
  select: executeSelectCQN,
  stream: executeSelectStreamCQN,
  cqn: executeGenericCQN,
  sql: executePlainSQL
}
