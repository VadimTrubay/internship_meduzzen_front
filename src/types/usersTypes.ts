import {authUserType} from "./authTypes";

export interface initialUsersType {
  items: {
    users: UserType[];
    total_count: number;
  };
  userById: UserType | null;
  loading: boolean;
  error: null;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface FetchUsersParams {
  skip: number;
  limit: number;
}

export interface UserProps {
  user: authUserType;
}

export interface UsersListProps {
  users: UserType[];
}