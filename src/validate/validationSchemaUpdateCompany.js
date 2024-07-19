import * as Yup from "yup";

export const validationSchemaUpdateCompany = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9_\s!@#$%^&*()\-+=?]+$/, "Invalid name format")
    .required()
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must not exceed 50 characters"),
  description: Yup.string()
    .matches(/^[a-zA-Z0-9_\s!@#$%^&*()\-+=?]+$/, "Invalid description format")
    .required()
    .min(4, "description must be at least 4 characters")
    .max(500, "description must not exceed 1500 characters"),
  visible: Yup.boolean()
});