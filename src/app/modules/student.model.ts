import { Schema, model } from "mongoose";
import {
  Gurdian,
  LocalGurdian,
  Student,
  Username,
} from "./student/student.interface";

const userNameSchema = new Schema<Username>({
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const localgurdianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: String, required: true },
});

const gurdianSchema = new Schema<Gurdian>({
  fathername: { type: String, required: true },
  fatheroccupation: { type: String, required: true },
  fathercontuctno: { type: String, required: true },
  mothername: { type: String, required: true },
  motheroccupation: { type: String, required: true },
  mothercontuctno: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ["male", "female"],
  dateofbirth: { type: String },
  email: { type: String, required: true },
  contactno: { type: String, required: true },
  emergencyContuctno: { type: String, required: true },
  BloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  presentaddress: { type: String, required: true },
  parmanentaddress: { type: String, required: true },
  gurdian: gurdianSchema,
  localgurdian: localgurdianSchema,
  profileImage: { type: String },
  isActive: ["active", "blocked"],
});

export const StudentModel = model<Student>("Student", studentSchema);
