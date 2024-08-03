export interface initialActionsType {
  members: memberType[];
  admins: memberType[];
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
  company_id: string;
  action_id: string;
  user_username: string;
  company_name: string;
  role: string;
}

export interface myRequestsType {
  id: string,
  user_id: string,
  company_id: string,
  status: string,
  type: string
}

export interface sendInviteType {
  userId: string;
  companyId: string;
}

export interface changeRoleType {
  userId: string;
  companyId: string;
}

export interface sendRequestType {
  userId: string | null;
  companyId: string | null;
}