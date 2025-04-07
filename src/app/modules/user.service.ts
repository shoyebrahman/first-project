//import { object } from "joi";
import config from "../config";
import { TAcademicSemester } from "./academicsemster/academicsemester.interface";
import { AcademicSemester } from "./academicsemster/academicsemester.model";
import { Student } from "./student.model";
import { TStudent } from "./student/student.interface";
import { User } from "./user.model";
import { TUser } from "./user/user.interface";
import { generateStudentId } from "./user/user.utils";

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";

  // set id automatically

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester
  );

  //set manually generated id
  userData.id = await generateStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData); //built in static method

  //create a student
  if (Object.keys(newUser).length) {
    //set id , _id as user
    payLoad.id = newUser.id;
    payLoad.user = newUser._id;
  }

  const newStudent = await Student.create(payLoad);
  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};
