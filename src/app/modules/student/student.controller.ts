import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import Joi from "joi";
import studentSchema from "./student.validation";
import { studentvalidationSchema } from "./student.zodvalidation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // create a validation schema for joi

    const { student: studentData } = req.body;

    //validation using zod
    //const zodparseData = studentvalidationSchema.parse(studentData);

    const { error, value } = studentSchema.validate(studentData);

    //console.log({ error }, { value });

    if (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        error,
      });
    }

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    //send response

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went worong",
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went worong",
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student are retrived successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went worong",
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student are deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went worong",
      error: err,
    });
  }
};

export const studentcontroller = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
