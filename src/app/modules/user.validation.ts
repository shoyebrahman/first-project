import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .max(20, { message: "password not more than 20 caracter" })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
