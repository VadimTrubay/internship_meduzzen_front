export interface authType {
  user: {
    username: string | null,
    email: string | null,
    password: string | null,
    is_admin: boolean,
  },
  access_token: string | null,
  isLoggedIn: boolean,
}