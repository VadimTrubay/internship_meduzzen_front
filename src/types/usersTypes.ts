import {authType} from "./authTypes";

export interface initialUsersType {
  items: Array<UserType> | [];
  userById: UserType | null;
  totalCount: number | null;
  loading: boolean;
  error: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
  is_admin: boolean,
}

export interface FetchUsersParams {
  skip: number;
  limit: number;
}

interface UserProps {
  user: authType;
}