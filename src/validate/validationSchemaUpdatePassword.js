import * as Yup from "yup";

export const validationSchemaUpdatePassword = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one digit"
    ),
});
