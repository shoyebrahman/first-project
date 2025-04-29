//import { object } from "joi";
import mongoose from "mongoose";
import config from "../config";
//import { TAcademicSemester } from "./academicsemster/academicsemester.interface";
import { AcademicSemester } from "./academicsemster/academicsemester.model";
import { Student } from "./student.model";
import { TStudent } from "./student/student.interface";
import { User } from "./user.model";
import { TUser } from "./user/user.interface";
import { generateStudentId } from "./user/user.utils";
import AppError from "../Errors/appErrors";
import status from "http-status";

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await Student.create([payLoad], { session });

    if (!newStudent.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
