import { NextFunction, Request, Response } from "express";

import { TaskErrorResponse } from "../global/types.ts";
import { TASKERRORS } from "../global/constants.ts";

export function validateCreateTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { content, status } = req.body;

  const errors: TaskErrorResponse = {};
  if (content.trim().length) errors.content = TASKERRORS.CONTENTEMPTY;
  if (typeof status !== "boolean") errors.status = TASKERRORS.STATUSINVALIDE;
  if (Object.entries(errors).length)
    return res.status(400).json({
      errors,
    });

  next();
}
