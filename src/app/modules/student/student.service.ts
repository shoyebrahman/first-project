//import { TStudent } from "./student.interface";
//import path from "path";
import { Student } from "../student.model";
import mongoose from "mongoose";
import AppError from "../../Errors/appErrors";
import status from "http-status";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.conostant";
import { populate } from "dotenv";
import path from "path";
//import { studentcontroller } from "./student.controller";

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  console.log("base query", query);
  //const queryobj = { ...query }; // copy query field
  // add searching

  // { email: { $reges : query.searchTem , $options: i}}
  // { presentAddress : { $regex : query.searchTerm, $option: i}}
  // { 'name.firstName' : {$regex: query.seacahTerm , $options: i}}

  // const studentSearchablefield = [
  //   "email",
  //   "name.firstName",
  //   "presentAddress",
  //   "fields",
  // ];
  // let searchTerm = "";

  // if (query?.seacahTerm) {
  //   searchTerm = query?.seacahTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchablefield.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // // filtering

  // const excludeFields = ["seacahTerm", "sort", "limit", "page", "fields"];

  // excludeFields.forEach((el) => delete queryobj[el]);
  // //console.log({ query }, { queryobj });

  // const filterQuery = searchQuery
  //   .find(queryobj)
  //   .populate("admissionSemester")
  //   .populate({
  //     path: "AcademicDepartment",
  //     populate: {
  //       path: "AcademicFaculty",
  //     },
  //   });

  //   let sort = "-createdAt";

  //   if (query.sort) {
  //     sort = query.sort as string;
  //   }

  //   const sortQuery = filterQuery.sort(sort);

  //   let page = 1;
  //   let limit = 1;
  //   let skip = 0;

  //   if (query.limit) {
  //     limit = Number(query.limit);
  //   }

  //   if (query.page) {
  //     page = Number(query.page);
  //     skip = (page - 1) * limit;
  //   }

  //   const paginateQuery = sortQuery.skip(skip);

  //   const limitQuery = paginateQuery.limit(limit);

  //   // field limiting

  //   let fields = "-__v";

  //   //fields: 'name,email';
  //   //fields: 'name email';

  //   if (query.fields) {
  //     fields = (query.fields as string).split(",").join(" ");
  //     console.log({ fields });
  //   }

  //   const fieldQuery = await limitQuery.select(fields);

  //   return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({
        path: "AcademicDepartment",
        populate: {
          path: "AcademicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });

  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "AcademicDepartment",
      populate: {
        path: "AcademicFaculty",
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payLoad: Partial<TStudent>) => {
  const {
    name: name,
    gurdian,
    localgurdian,
    ...remainingStudentData
  } = payLoad;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    gurdian: {
    fatherOccupation: "Teacher"}

    name.firstName = 'Mezba'
    name.lastName = 'Avedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value;
    }
  }
  if (localgurdian && Object.keys(localgurdian).length) {
    for (const [key, value] of Object.entries(localgurdian)) {
      modifiedUpdatedData[`localgurdian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidatiors: true,
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(status.BAD_REQUEST, "Faild to delete Student");
    }

    const deletedUser = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, "Faild to delete User");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
