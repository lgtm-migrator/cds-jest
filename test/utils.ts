import path from "path";

export function getTestOptions(): any {
  return { root: path.join(__dirname, "./sample-app") }
}
