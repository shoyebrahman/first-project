import { z } from "zod";

const usernameSchema = z.object({
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

const localGuardianSchema = z.object({
  name: z.string().min(1, "Guardian name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  address: z.string().min(1, "Address is required"),
  contactNo: z.string().min(1, "Contact number is required"),
});

const guardianSchema = z.object({
  fathername: z.string().min(1, "Father's name is required"),
  fatheroccupation: z.string().min(1, "Father's occupation is required"),
  fathercontuctno: z.string().min(1, "Father's contact number is required"),
  mothername: z.string().min(1, "Mother's name is required"),
  motheroccupation: z.string().min(1, "Mother's occupation is required"),
  mothercontuctno: z.string().min(1, "Mother's contact number is required"),
});

const studentvalidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: usernameSchema,
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender must be male, female, or other" }),
  }),
  dateofbirth: z.string().optional(),
  email: z.string().email("Invalid email address"),
  contactno: z.string().min(1, "Contact number is required"),
  emergencyContuctno: z.string().min(1, "Emergency contact number is required"),
  BloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentaddress: z.string().min(1, "Present address is required"),
  parmanentaddress: z.string().min(1, "Permanent address is required"),
  gurdian: guardianSchema,
  localgurdian: localGuardianSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
});

export { studentvalidationSchema };
