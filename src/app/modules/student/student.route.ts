import express from "express";
import { studentcontroller } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { studentvalidationSchema } from "./student.zodvalidation";

const router = express.Router();

router.get("/", studentcontroller.getAllStudents);

router.get("/:studentId", studentcontroller.getSingleStudent);

router.patch(
  "/:studentId",
  validateRequest(studentvalidationSchema.updateStudentValidationSchema),
  studentcontroller.updatedStudent
);

router.delete("/:studentId", studentcontroller.deleteStudent);

export const StudentRoutes = router;
