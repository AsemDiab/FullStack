import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/config_env.ts";

export function authorizeOwnership(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.send("entered");
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  try {
    if (req.user?.id !== req.params.user_id)
      return res
        .status(403)
        .json({ error: "You do not have permission to access this resource." });

    next();
  } catch {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
}
