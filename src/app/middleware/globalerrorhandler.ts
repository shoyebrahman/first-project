/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { TErrorSource } from "../interface/error";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import handleZodError from "../Errors/handleZodError";
import handleValidationError from "../Errors/handleValidationError";
import handleCastError from "../Errors/handleCastError";
import handleDuplicateError from "../Errors/handleDuplicateError";
import AppError from "../Errors/appErrors";

// create a global error handler

const globalerrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values

  let statusCode = 500;
  let message = "Something went wrong!";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "somethig wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;

    //message = "ami zod error";
    //console.log(simplifiedError);
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    const simplifiedError = handleDuplicateError(err);

    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
    //amierror: err,
  });
};

export default globalerrorhandler;
