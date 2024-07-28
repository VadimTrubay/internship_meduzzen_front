export interface initialActionsType {
  members: memberType[];
  myInvites: memberType[];
  myRequests: myRequestsType[];
  companyInvites: memberType[];
  companyRequests: memberType[];
  loading: boolean;
  error: null;
}

export interface memberType {
  id: string;
  user_id: string;
  user_username: string;
}

export interface myRequestsType {
  id: string,
  user_id: string,
  company_id: string,
  status: string,
  type: string
}

export interface sendInviteType {
  user_id: string;
  company_id: string;
}

export interface sendRequestType {
  company_id: string | null;
}