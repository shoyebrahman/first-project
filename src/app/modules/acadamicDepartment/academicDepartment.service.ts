import { TAcademicDepartment } from "./acadamicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    {
      _id: id,
    },
    payLoad,
    {
      new: true,
    }
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
