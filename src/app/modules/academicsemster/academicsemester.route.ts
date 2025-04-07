import express from "express";
import { AcademicSemestercontrollers } from "./academicsemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidations } from "./academicsemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemestercontrollers.createAcademicSemester
);

router.get(
  "/:semesterId",
  AcademicSemestercontrollers.getSingleAcademicSemester
);

router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemestercontrollers.updateAcademicSemester
);

router.get("/", AcademicSemestercontrollers.getAllAcademicSemesters);

//router.get("/", studentcontroller.getAllStudents);

//router.get("/:studentId", studentcontroller.getSingleStudent);

//router.delete("/:studentId", studentcontroller.deleteStudent);

export const AcademicSemesterRoutes = router;
