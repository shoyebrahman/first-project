import { Router } from "express";
import { UserRoutes } from "../modules/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicsemster/academicsemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepatmentRoutes } from "../modules/acadamicDepartment/academicDepartment.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-facultyes",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: AcademicDepatmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

router.use("/users", UserRoutes);
router.use("/students", StudentRoutes);

export default router;
