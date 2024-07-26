export interface initialActionsType {
  members: memberType[];
  loading: boolean;
  error: null;
}

export interface memberType {
  id: string;
  user_id: string;
  user_username: string;
}