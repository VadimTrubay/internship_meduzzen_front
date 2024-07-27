import {authUserType} from "./authTypes";

export interface initialUsersType {
  items: UserType[];
  userById: null;
  totalCount: null;
  loading: boolean;
  error: null;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
  is_admin: boolean,
}

export interface FetchUsersParams {
  skip: number | null;
  limit: number | null;
}

export interface UserProps {
  user: authUserType;
}

export interface UsersListProps {
  users: UserType[];
}