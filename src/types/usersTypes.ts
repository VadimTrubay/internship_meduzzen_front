export interface initialUsersType {
  items: Array<UserType> | [];
  userById: UserType | null;
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

export interface UsernameUpdateType {
  userId: string
  username: string
}
