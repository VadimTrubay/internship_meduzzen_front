import {CompanyAddType, CompanyUpdateType} from "../types/companiesTypes";
import {PasswordUpdateType, UserAuthorizationType, UserRegistrationType} from "../types/authTypes";

export const initialValues: CompanyAddType = {
  name: "",
  description: "",
  visible: true,
};

export const initialValueUpdateCompany: CompanyUpdateType = {
  id: "",
  name: "",
  description: "",
  visible: true,
};

export const initialValueUpdateUsername: { username: string } = {
  username: "",
};

export const initialValueUpdatePassword: PasswordUpdateType = {
  password: "",
  new_password: "",
  confirmPassword: "",
};

export const initialValueUserAuthorization: UserAuthorizationType = {
  email: "",
  password: "",
};

export const initialValueUserRegistration: UserRegistrationType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}
