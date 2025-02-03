import express from "express";
import { studentcontroller } from "./student.controller";

const router = express.Router();

router.post("/create-student", studentcontroller.createStudent);

router.get("/", studentcontroller.getAllStudents);

router.get("/:studentId", studentcontroller.getSingleStudent);

export const StudentRoutes = router;
