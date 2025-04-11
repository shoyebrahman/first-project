import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Department must be string",
      required_error: "Name is Require",
    }),

    AcademicFaculty: z.string({
      invalid_type_error: "Academic Faculty must be string",
      required_error: "Faculty is required",
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department must be string",
        required_error: "Name is Require",
      })
      .optional(),

    AcademicFaculty: z
      .string({
        invalid_type_error: "Academic Faculty must be string",
        required_error: "Faculty is required",
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
