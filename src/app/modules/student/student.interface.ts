import { Types } from "joi";
import { Schema, model, connect, Model } from "mongoose";

export type TGurdian = {
  fathername: string;
  fatheroccupation: string;
  fathercontuctno: string;
  mothername: string;
  motheroccupation: string;
  mothercontuctno: string;
};

export type TUsername = {
  firstname: string;
  middlename: string;
  lastname: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
// 1. Create an interface representing a document in MongoDB.
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUsername;
  email: string;
  gender: "male" | "female";
  dateofbirth?: Date;
  contactno: string;
  emergencyContuctno: string;
  BloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentaddress: string;
  parmanentaddress: string;
  gurdian: TGurdian;
  localgurdian: TLocalGurdian;
  profileImage?: string;
  isDeleted: boolean;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;

  //for creating instance

  //export type StudentMethods = {
  //isUserExists(id: string): Promise<TStudent | null>;
  //};

  //export type StudentModel = Model<
  //TStudent,
  //Record<string, never>,
  // StudentMethods
  //>;
}
