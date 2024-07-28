export const auth = "/auth";
export const users = "/users";
export const companies = "/companies";
export const actions = "/actions";
export const membersCompany = `${actions}/company/members`;


export const mainUrls = {
  index: "/",
  id: ":id",
  about: "about",
  terms: "terms",
  notFound: "*",
  healthcheck: "/healthcheck",
  auth: {
    signup: `${auth}/signup`,
    login: `${auth}/login`,
    me: `${auth}/me`
  },
  users: {
    submit: users,
    all: (skip: number, limit: number) => `${users}?skip=${skip}&limit=${limit}`,
    byId: (id: string) => `${users}/${id}`,
  },
  companies: {
    submit: companies,
    all: (skip: number, limit: number) => `${companies}?skip=${skip}&limit=${limit}`,
    byId: (id: string) => `${companies}/${id}`,
  },
  actions: {
    myInvites: `${actions}/my/invites`,
    myRequests: `${actions}/my/requests`,
    sendInvite: `${actions}/invite`,
    deleteInvite: (actionId: string) => `${actions}/invite?action_id=${actionId}`,
    sendRequest: `${actions}/request`,
    deleteRequest: (actionId: string) => `${actions}/request?action_id=${actionId}`,
    membersCompany: (companyId: string) => `${actions}/company/members?company_id=${companyId}`,
    companyInvites: (companyId: string) => `${actions}/company/invites?company_id=${companyId}`,
    companyRequests: (companyId: string) => `${actions}/company/requests?company_id=${companyId}`,
    kick: (actionId: string) => `${actions}/kick?action_id=${actionId}`,
    leave: (actionId: string) => `${actions}/leave/?action_id=${actionId}`,
    acceptInvite: (actionId: string) => `${actions}/invite/accept?action_id=${actionId}`,
    declineInvite: (actionId: string) => `${actions}/invite/decline?action_id=${actionId}`,
    acceptRequest: (actionId: string) => `${actions}/request/accept?action_id=${actionId}`,
    declineRequest: (actionId: string) => `${actions}/request/decline?action_id=${actionId}`,
  }
}

//     userToAdmin: (company_id: number, user_id: number) => `${invitation}/company/${company_id}/${user_id}/add_to_admin`,
//     adminToUser: (company_id: number, user_id: number) => `${invitation}/company/${company_id}/${user_id}/remove_from_admin`,
//     admins: (company_id: number) => `${invitation}/action/${company_id}/get_list_of_admins`,
//