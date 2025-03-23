/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from "express";

// create a global error handler

const globalerrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = err.message || "Something went wrong!";

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalerrorhandler;
