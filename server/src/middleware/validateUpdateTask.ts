import { NextFunction, Request, Response } from "express";

import { TaskErrorResponse } from "../global/types.ts";

export function validateUpdateTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { content, status } = req.body;

  // const ContentErrors = validateTaskContent(content ?? "c");
  // const StatusErrors = validateTaskStatus(status ?? false);

  // const errors: TaskErrorResponse = {};
  // if (ContentErrors) errors.content = [...ContentErrors];
  // if (StatusErrors) errors.status = StatusErrors;
  // if (StatusErrors || ContentErrors) {
  //   return res.status(400).json({
  //     errors,
  //   });
  // }

  next();
}
