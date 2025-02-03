import { Schema, model, connect } from "mongoose";

export type Gurdian = {
  fathername: string;
  fatheroccupation: string;
  fathercontuctno: string;
  mothername: string;
  motheroccupation: string;
  mothercontuctno: string;
};

export type Username = {
  firstname: string;
  middlename: string;
  lastname: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
// 1. Create an interface representing a document in MongoDB.
export type Student = {
  id: string;
  name: Username;
  email: string;
  gender: "male" | "female";
  dateofbirth?: string;
  contactno: string;
  emergencyContuctno: string;
  BloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentaddress: string;
  parmanentaddress: string;
  gurdian: Gurdian;
  localgurdian: LocalGurdian;
  profileImage?: string;
  isActive: "active" | "blocked";
};
