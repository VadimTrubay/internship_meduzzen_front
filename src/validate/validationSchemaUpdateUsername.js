import * as Yup from "yup";

export const validationSchemaUpdateUsername = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_\s!@#$%^&*()\-+=?]+$/, "Invalid name format")
    .required()
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must not exceed 50 characters"),
});
