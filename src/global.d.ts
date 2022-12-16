declare namespace Express {
  type ReqUser = Omit<import("./user.entity").User, "password">;

  export interface User extends ReqUser {}
}

declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    SECRET: string;
  }
}
