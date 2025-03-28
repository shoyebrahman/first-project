import express from "express";
import { studentcontroller } from "./student.controller";

const router = express.Router();

router.get("/", studentcontroller.getAllStudents);

router.get("/:studentId", studentcontroller.getSingleStudent);

router.delete("/:studentId", studentcontroller.deleteStudent);

export const StudentRoutes = router;
