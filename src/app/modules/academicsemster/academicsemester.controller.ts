import status from "http-status";
import { RequestHandler } from "express";
import { AcademicSemesterServices } from "./academicsemester.service";
import sendResponse from "../../utils/sendresponse";
import catchAsync from "../../utils/catchAsync";

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  //const zodParseData = studentvalidationSchema.parse(studentData);

  // will call service func to send this data
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );
  //send response

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic semester is created successfully",
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic semester is retrived successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic semester is retrieved successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic semester is updated successfully",
    data: result,
  });
});

export const AcademicSemestercontrollers = {
  createAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  getAllAcademicSemesters,
};
