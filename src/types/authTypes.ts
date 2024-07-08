export interface authType {
  user: {
    username: string | null,
    email: string | null,
  },
  token: string | null,
  isLoggedIn: boolean,
  isRefreshing: boolean,
}