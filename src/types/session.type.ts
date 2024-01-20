import { SessionData } from "express-session";

export interface CustomSessionData extends SessionData {
  sort?: Record<string, number>;
}

declare module "express-session" {
  interface SessionData {
    sort?: Record<string, number>;
  }
}
