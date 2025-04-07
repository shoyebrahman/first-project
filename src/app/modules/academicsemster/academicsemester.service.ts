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

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicSemester>
) => {
  if (
    payLoad.name &&
    payLoad.code &&
    academicSemesterCodeMapper[payLoad.name] !== payLoad.code
  ) {
    throw new Error("Invalid semester Code");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
  getSingleAcademicSemesterFromDB,
};
