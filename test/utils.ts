import { TestOptions } from "../src/types";
import path from "path";

export function getTestOptions(): TestOptions {
  return {
    root: path.join(__dirname, "./sample-app"),
  }
}
