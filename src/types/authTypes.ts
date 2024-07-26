export interface initialAuthType {
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    new_password: string;
    is_admin: boolean;
  },
  access_token: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
}

export interface authType {
  id: string;
  username: string;
  email: string;
  password: string;
  new_password: string;
  is_admin: boolean;
  access_token: string;
}

export interface UsernameUpdateType {
  id: string;
  username: string;
}

export interface PasswordUpdateType {
  password: string;
  new_password: string;
  confirmPassword: string;
}

export interface PasswordUpdateBackType {
  id: string;
  password: string;
  new_password: string;
}

export interface UserAuthorizationType {
  email: string;
  password: string;
}

export interface UserRegistrationType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string,
}

export interface RegisterType {
  username: string;
  email: string;
  password: string;
}
