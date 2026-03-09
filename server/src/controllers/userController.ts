import bcrypt from "bcrypt";
import { User } from "../global/types.ts";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUserById,
} from "../database/mutations/userServices.ts";
import { Request, Response } from "express";
import { generateToken } from "../common/generateToken.ts";
import ENV_CONFIG from "../config/config_env.ts";
export async function register(req: Request, res: Response) {
  try {
    const { email, password_hash }: Omit<User, "id"> = req.body;

    const existingUser: User | null = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "This email is already used",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password_hash + ENV_CONFIG.Security.PASSWORDPEPPER,
      ENV_CONFIG.Security.passwordSalt,
    );

    const user = await createUser(email, hashedPassword);

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password_hash }: Omit<User, "id"> = req.body;

    const existingUser: User | null = await getUserByEmail(email);

    if (!existingUser) {
      return res.status(401).json({
        message: "The email or password is not correct",
      });
    }

    const isValid = await bcrypt.compare(
      password_hash + ENV_CONFIG.Security.PASSWORDPEPPER,
      existingUser.password_hash,
    );
    console.log(isValid);

    if (!existingUser || !isValid) {
      return res.status(401).json({
        message: "The email or password is not correct",
      });
    }

    const token = generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });
    return res.status(200).json({
      message: "User signed in successfully",
      token: token,
      user_id: existingUser.id,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    const user_id = req.params.user_id as string;

    const existingUser: User | null = await getUserById(user_id);

    if (!existingUser) {
      return res.status(404).json({
        message: "The user not found",
      });
    }

    await deleteUserById(user_id);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
