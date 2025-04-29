import { TAcademicSemester } from "../academicsemster/academicsemester.interface";
import { User } from "../user.model";

const findLastStudentId = async (year: string, code: string) => {
  const prefix = `${year}${code}`;
  const lastStudent = await User.findOne(
    {
      role: "student",
      id: { $regex: `^${prefix}` },
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      id: -1,
    })
    .lean();

  return lastStudent?.id;
};

export const generateStudentId = async (payLoad: TAcademicSemester) => {
  const year = payLoad.year;
  const code = payLoad.code;

  const lastId = await findLastStudentId(year, code);

  let lastNumericPart = 0;
  if (lastId) {
    lastNumericPart = parseInt(lastId.slice(6), 10); // get last 4 digits
  }

  const newIdNumber = (lastNumericPart + 1).toString().padStart(4, "0");
  const finalId = `${year}${code}${newIdNumber}`; // e.g., 2030010002

  return finalId;
};
