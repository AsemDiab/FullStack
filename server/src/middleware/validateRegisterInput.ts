import { NextFunction, Request, Response } from "express";
import { emailRegex } from "../global/constants.ts";
import { validateEmail, validatePassword } from "../common/Validators.ts";
import { RegisterErrorResponse } from "../global/types.ts";

export function validateRegisterInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password_hash } = req.body;

  const emailMsg = validateEmail(email);
  const passwordMsg = validatePassword(password_hash);

  const errors: RegisterErrorResponse = {};

  if (emailMsg) errors.email = emailMsg;
  if (passwordMsg) errors.password = [...passwordMsg];
  if (emailMsg || passwordMsg) {
    return res.status(400).json({
      errors,
    });
  }

  next();
}
