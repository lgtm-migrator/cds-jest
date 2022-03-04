
import type { AxiosInstance } from "axios"

export interface Test {
  /**
   * Provides the expect function from the chai assertion library.
   */
  expect: any;

  /**
  * Provides the chai assertion library. 
  * It is pre-configured with the chai-subset and chai-as-promised plugins. 
  * These plugins contribute the containSubset and eventually APIs, respectively.
  */
  chai: any;

  /**
  * Provides utilities to manage test data:
  */
  data: {
    /**
    *  enables automatic deletion and redeployment of CSV data before each test. Default is false.
    */
    autoReset: (autoRest: boolean) => Promise<void>;
    /**
    * deletes data in all database tables
    */
    delete: () => Promise<void>;
    /**
    * deletes data in all database tables and deploys CSV data again
    */
    reset: () => Promise<void>;
  };
  /**
  * Provides the Axios instance that is used as HTTP client. 
  * It comes pre-configured with the base URL of the running server, that is, http://localhost:.... 
  * This way, you only need to specify host-relative URLs in tests, like /catalog/Books.
  */
  axios: AxiosInstance;
  /**
   * Sets the given path segments as project root.
   * 
   * @example
   * ```js
   * cds.test.in(__dirname, '..').run('serve', '--in-memory')
   * ```
   */
  in: (...paths: string[]) => Test;

  run: (...commands: string[]) => Test;

  verbose: (verbose: boolean) => Test;

  // alias for axios

  GET: AxiosInstance['get']
  PATCH: AxiosInstance['patch']
  POST: AxiosInstance['post']
  PUT: AxiosInstance['put']
  DELETE: AxiosInstance['delete']
  get: AxiosInstance['get']
  patch: AxiosInstance['patch']
  post: AxiosInstance['post']
  put: AxiosInstance['put']
  delete: AxiosInstance['delete']
}
