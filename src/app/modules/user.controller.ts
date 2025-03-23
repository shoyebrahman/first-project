//import { studentvalidationSchema } from "./student/student.zodvalidation";
import status from "http-status";
import sendResponse from "../utils/sendresponse";
import { UserServices } from "./user.service";
import { NextFunction, Request, Response } from "express";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    //const zodParseData = studentvalidationSchema.parse(studentData);

    // will call service func to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
    //send response

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const Usercontrollers = {
  createStudent,
};
