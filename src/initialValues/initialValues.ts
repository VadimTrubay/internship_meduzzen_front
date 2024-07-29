import {CompanyAddType, CompanyUpdateType} from "../types/companiesTypes";
import {PasswordUpdateType, UserAuthorizationType, UsernameUpdateType, UserRegistrationType} from "../types/authTypes";

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

export const initialValueUpdateUsername: UsernameUpdateType = {
  id: "",
  username: "",
};

export const initialValueUpdatePassword: PasswordUpdateType = {
  id: "",
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
