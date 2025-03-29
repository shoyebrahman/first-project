import { AnyZodObject, Schema } from "zod";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      // if everything allright next()->
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
