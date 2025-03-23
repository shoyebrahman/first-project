import express from "express";
import { Usercontrollers } from "./user.controller";

const router = express.Router();

router.post("/create-student", Usercontrollers.createStudent);

export const UserRoutes = router;
