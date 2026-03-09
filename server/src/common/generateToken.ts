import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/config_env.ts";
export function generateToken(payload: Object | string) {
  return jwt.sign(
    payload,
    ENV_CONFIG.JWT.SECRET as jwt.Secret,
    {
      expiresIn: ENV_CONFIG.JWT.EXPIRES_IN,
    } as jwt.SignOptions,
  );
}
