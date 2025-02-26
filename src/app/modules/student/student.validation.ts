import Joi from "joi";

const usernameSchema = Joi.object({
  firstname: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, "capitalized format")
    .required(),
  middlename: Joi.string().optional().allow(""),
  lastname: Joi.string().alphanum().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  address: Joi.string().required(),
  contactNo: Joi.string().required(),
});

const guardianSchema = Joi.object({
  fathername: Joi.string().required(),
  fatheroccupation: Joi.string().required(),
  fathercontuctno: Joi.string().required(),
  mothername: Joi.string().required(),
  motheroccupation: Joi.string().required(),
  mothercontuctno: Joi.string().required(),
});

const studentSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().max(20),
  name: usernameSchema.required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  dateofbirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactno: Joi.string().required(),
  emergencyContuctno: Joi.string().required(),
  BloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional(),
  presentaddress: Joi.string().required(),
  parmanentaddress: Joi.string().required(),
  gurdian: guardianSchema.required(),
  localgurdian: localGuardianSchema.required(),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid("active", "blocked").default("active"),
  isDeleted: Joi.boolean(),
});

export default studentSchema;
