export interface initialAuthType {
  user: {
    id: string | null;
    username: string | null,
    email: string | null,
    password: string | null,
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
  is_admin: boolean,
  access_token: string | null,
}