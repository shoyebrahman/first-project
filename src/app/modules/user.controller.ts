//import { studentvalidationSchema } from "./student/student.zodvalidation";
import status from "http-status";
import sendResponse from "../utils/sendresponse";
import { UserServices } from "./user.service";
import { RequestHandler } from "express";
import catchAsync from "../utils/catchAsync";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  //const zodParseData = studentvalidationSchema.parse(studentData);

  // will call service func to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);
  //send response

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "student is created successfully",
    data: result,
  });
});

export const Usercontrollers = {
  createStudent,
};
