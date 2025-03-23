//import { object } from "joi";
import config from "../config";
import { Student } from "./student.model";
import { TStudent } from "./student/student.interface";
import { User } from "./user.model";
import { TUser } from "./user/user.interface";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";

  //set manually generated id
  userData.id = "2030100001";

  // create a user
  const newUser = await User.create(userData); //built in static method

  //create a student
  if (Object.keys(newUser).length) {
    //set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
  }

  const newStudent = await Student.create(studentData);
  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};
