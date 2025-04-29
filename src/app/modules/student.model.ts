/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, SchemaType, model } from "mongoose";
import validator from "validator";

import {
  TGurdian,
  TLocalGurdian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUsername,
} from "./student/student.interface";
//import { func } from "joi";
//import { kMaxLength } from "buffer";

//import config from "../config";

const userNameSchema = new Schema<TUsername>({
  firstname: {
    type: String,
    trim: true,
    required: [true, "First name is require"],
    maxlength: [20, "first name can not be more than 20 caracters"],
    validate: {
      validator: function (value: string) {
        const firstnamestr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstnamestr === value;
      },
      message: "{VALUE} is not in capitalized format",
    },
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const localgurdianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: String, required: true },
});

const gurdianSchema = new Schema<TGurdian>({
  fathername: { type: String, required: true },
  fatheroccupation: { type: String, required: true },
  fathercontuctno: { type: String, required: true },
  mothername: { type: String, required: true },
  motheroccupation: { type: String, required: true },
  mothercontuctno: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User | is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "namw id requred"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "the gender field only be one of the following",
      },
      require: true,
    },
    dateofbirth: { type: Date },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "{VALUE} is not valid email adderss",
      },
    },
    contactno: { type: String, required: true },
    emergencyContuctno: { type: String, required: true },
    BloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentaddress: { type: String, required: true },
    parmanentaddress: { type: String, required: true },
    gurdian: {
      type: gurdianSchema,
      required: true,
    },
    localgurdian: {
      type: localgurdianSchema,
      required: true,
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    AcademicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//pre save middleware/ hook

// virtual

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstname} ${this.name.middlename} ${this.name.lastname}`;
});

// query middleware

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// creating a custom instance method
//studentSchema.methods.isUserExists = async function (id: string) {
//const existingUser = await Student.findOne({ id });

//return existingUser;
//};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
