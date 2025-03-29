import { academicSemesterCodeMapper } from "./academicsemester.constant";
import { TAcademicSemester } from "./academicsemester.interface";
import { AcademicSemester } from "./academicsemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester name --> semester code

  // academic semester code mapper ['Fall]
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
