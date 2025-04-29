import { z } from "zod";

const usernameValidationSchema = z.object({
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(20, "First name cannot be more than 20 characters")
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      "First name must be capitalized"
    ),
  middlename: z.string().optional(),
  lastname: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z]+$/, "Last name is not valid"),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Guardian name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  address: z.string().min(1, "Address is required"),
  contactNo: z.string().min(1, "Contact number is required"),
});

const guardianValidationSchema = z.object({
  fathername: z.string().min(1, "Father's name is required"),
  fatheroccupation: z.string().min(1, "Father's occupation is required"),
  fathercontuctno: z.string().min(1, "Father's contact number is required"),
  mothername: z.string().min(1, "Mother's name is required"),
  motheroccupation: z.string().min(1, "Mother's occupation is required"),
  mothercontuctno: z.string().min(1, "Mother's contact number is required"),
});

const createstudentvalidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: usernameValidationSchema,
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Gender must be male, female, or other" }),
      }),
      dateofbirth: z.string().optional(),
      email: z.string().email("Invalid email address"),
      contactno: z.string().min(1, "Contact number is required"),
      emergencyContuctno: z
        .string()
        .min(1, "Emergency contact number is required"),
      BloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentaddress: z.string().min(1, "Present address is required"),
      parmanentaddress: z.string().min(1, "Permanent address is required"),
      gurdian: guardianValidationSchema,
      localgurdian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      AcademicDepartment: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

// for update

const updateUsernameValidationSchema = z.object({
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(20, "First name cannot be more than 20 characters")
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      "First name must be capitalized"
    )
    .optional(),
  middlename: z.string().optional(),
  lastname: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z]+$/, "Last name is not valid")
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Guardian name is required").optional(),
  occupation: z.string().min(1, "Occupation is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  contactNo: z.string().min(1, "Contact number is required").optional(),
});

const updateGuardianValidationSchema = z.object({
  fathername: z.string().min(1, "Father's name is required").optional(),
  fatheroccupation: z
    .string()
    .min(1, "Father's occupation is required")
    .optional(),
  fathercontuctno: z
    .string()
    .min(1, "Father's contact number is required")
    .optional(),
  mothername: z.string().min(1, "Mother's name is required").optional(),
  motheroccupation: z
    .string()
    .min(1, "Mother's occupation is required")
    .optional(),
  mothercontuctno: z
    .string()
    .min(1, "Mother's contact number is required")
    .optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUsernameValidationSchema.optional(),
        gender: z
          .enum(["male", "female", "other"], {
            errorMap: () => ({
              message: "Gender must be male, female, or other",
            }),
          })
          .optional(),
        dateofbirth: z.string().optional(),
        email: z.string().email("Invalid email address").optional(),
        contactno: z.string().min(1, "Contact number is required").optional(),
        emergencyContuctno: z
          .string()
          .min(1, "Emergency contact number is required")
          .optional(),
        BloodGroup: z
          .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
          .optional(),
        presentaddress: z
          .string()
          .min(1, "Present address is required")
          .optional(),
        parmanentaddress: z
          .string()
          .min(1, "Permanent address is required")
          .optional(),
        gurdian: updateGuardianValidationSchema.optional(),
        localgurdian: updateLocalGuardianValidationSchema.optional(),
        admissionSemester: z.string().optional(),
        AcademicDepartment: z.string().optional(),
        profileImage: z.string().optional(),
      })
      .partial(), // Makes all fields inside `student` optional
  }),
});

export const studentvalidationSchema = {
  createstudentvalidationSchema,
  updateStudentValidationSchema,
};
