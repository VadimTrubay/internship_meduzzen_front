import {b} from "vite/dist/node/types.d-aGj9QkWt";

export interface authType {
  user: {
    username: string | null,
    email: string | null,
  },
  token: string | null,
  toggleLogged: boolean,
  isLoggedInBase: boolean,
  isLoggedInAuth0: boolean,
  isRefreshing: boolean,
}