export interface initialActionsType {
  members: Array<memberType> | [];
  loading: boolean;
  error: string;
}

export interface memberType {
  id: string;
  user_id: string;
  user_username: string;
}