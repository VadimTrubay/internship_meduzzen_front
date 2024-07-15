export interface initialUsersType {
  items: Array<UserType> | [];
  totalCount: number | null;
  loading: boolean;
  error: string | null;
}

export interface UserType {
  id: string | null;
  username: string | null,
  email: string | null,
  password: string | null,
  is_admin: boolean,
}

export type idUserType = {
  id: string;
}