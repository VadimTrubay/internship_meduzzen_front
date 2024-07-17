export interface initialAuthType {
  user: {
    id: string | null;
    username: string | null,
    email: string | null,
    password: string | null,
    new_password: string | null,
    is_admin: boolean,
  },
  access_token: string | null,
  isLoggedIn: boolean,
  loading: boolean,
  error: string | null,
}

export interface authType {
  id: string | null;
  username: string | null,
  email: string | null,
  password: string | null,
  new_password: string | null,
  is_admin: boolean,
  access_token: string | null,
}

export interface UsernameUpdateType {
  id: string
  username: string | null
}

export interface PasswordUpdateType {
  id: string
  password: string | null
  new_password: string | null
}