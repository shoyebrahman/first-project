import { z } from "zod";

const createacademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: " Academic Faculty must be string  ",
    }),
  }),
});

const updateacademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: " Academic Faculty must be string  ",
    }),
  }),
});

export const AcademicFacultyValidation = {
  createacademicFacultyValidationSchema,
  updateacademicFacultyValidationSchema,
};
