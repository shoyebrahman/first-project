import express, { NextFunction, Request, Response } from "express";
import { Usercontrollers } from "./user.controller";

import createstudentvalidationSchema, {
  studentvalidationSchema,
} from "./student/student.zodvalidation";
import validateRequest from "../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentvalidationSchema.createstudentvalidationSchema),
  Usercontrollers.createStudent
);

export const UserRoutes = router;
