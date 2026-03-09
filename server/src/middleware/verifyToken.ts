import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ENV_CONFIG from "../config/config_env.ts";
import { AppDataSource } from "../config/AppDataSource.ts";
import { User } from "../Entities/User.ts";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  try {
    const decoded = jwt.verify(token, ENV_CONFIG.JWT.SECRET);

    const userRepo = AppDataSource.getRepository(User);
    const existUser = await userRepo.findOne({
      where: { id: decoded.id },
    });
    console.log(existUser);
    if (!existUser)
      return res.status(404).json({
        message: "User not found",
      });

    if (decoded?.id !== req.params.user_id)
      return res
        .status(403)
        .json({ error: "You do not have permission to access this resource." });

    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      message: "Invalid token",
    });
  }
}
