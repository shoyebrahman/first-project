import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendresponse";
import status from "http-status";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "student are retrived successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "student are retrived successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

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

export const studentcontroller = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
