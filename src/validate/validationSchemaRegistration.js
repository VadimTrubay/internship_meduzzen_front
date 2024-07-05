import * as Yup from "yup";

export const validationSchemaRegistration = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Invalid name format")
    .required("Name is required")
    .min(4, "Name must be at least 4 characters")
    .max(25, "Name must not exceed 25 characters"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required")
    .min(4, "Email must be at least 4 characters")
    .max(25, "Email must not exceed 25 characters"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(25, "Password must not exceed 25 characters"),
});
