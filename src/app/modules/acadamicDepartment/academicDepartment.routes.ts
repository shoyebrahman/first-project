import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidation } from "./acadamicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  //validateRequest(
  //AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  //),
  AcademicDepartmentController.createAcademicDepartment
);

router.get(
  "/:departmentId",
  AcademicDepartmentController.getSingleAcademicDepartment
);

router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);

router.get("/", AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepatmentRoutes = router;
