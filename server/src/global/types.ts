import { JwtPayload } from "jsonwebtoken";
export type User = {
  id: string;
  email: string;
  password_hash: string;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export type TaskErrorResponse = {
  content?: string;
  status?: string;
};

export type RegisterErrorResponse = {
  email?: string | null;
  password?: string[];
};
