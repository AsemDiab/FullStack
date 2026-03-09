import { Router } from "express";
import {
  deleteAccount,
  login,
  register,
} from "../controllers/userController.ts";
import { verifyToken } from "../middleware/verifyToken.ts";
import { validateRegisterInput } from "../middleware/validateRegisterInput.ts";

export const userRouter = Router();

userRouter.post("/register", validateRegisterInput, register);
userRouter.post("/login", login);
userRouter.delete("/:user_id", verifyToken, deleteAccount);
