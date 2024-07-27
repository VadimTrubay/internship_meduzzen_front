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
    membersCompany: (companyId: string) => `${actions}/company/members?company_id=${companyId}`,
    companyInvites: (companyId: string) => `${actions}/company/invites?company_id=${companyId}`,
    companyRequests: (companyId: string) => `${actions}/company/requests?company_id=${companyId}`,
    myInvites: `${actions}/my/invites`,
    myRequests: `${actions}/my/requests`,
    kick: (actionId: string) => `${actions}/kick?action_id=${actionId}`,
    sendInvite: `${actions}/invite`,
    deleteInvite: (actionId: string) =>  `${actions}/invite?action_id=${actionId}`,
    acceptInvite: (actionId: string) => `${actions}/invite/accept?action_id=${actionId}`,
    declineInvite: (actionId: string) => `${actions}/invite/decline?action_id=${actionId}`,
  }
}

// candidates: (company_id: number) => `${invitation}/invite`,
//     send_invite: (company_id: number, user_id: number) => `${invitation}/invitation_send_from_company/${company_id}/user/${user_id}`,
//     send_request: (company_id: number) => `${invitation}/action/create_from_user/company/${company_id}/`,
//     company_invite: (company_id: number) => `${invitation}/company/${company_id}/invitation_list`,
//     company_requests: (company_id: number) => `${invitation}/company/${company_id}/requests_list`,
//     my_invite: () => `${invitation}/user/invitation_list`,
//     my_requests: () => `${invitation}/users/requests_list`,
//     cancel_invite: (action_id: number) => `${invitation}/${action_id}/cancel_invitation`,
//     cancel_requeest: (action_id: number) => `${invitation}/${action_id}/cancel_request`,
//     reject_invite: (action_id: number) => `${invitation}/${action_id}/reject_invite`,
//     reject_request: (action_id: number) => `${invitation}/${action_id}/reject_request`,
//     accept_invite: (action_id: number) => `${invitation}/${action_id}/accept_invite`,
//     accept_request: (action_id: number) => `${invitation}/${action_id}/accept_request`,
//     userToAdmin: (company_id: number, user_id: number) => `${invitation}/company/${company_id}/${user_id}/add_to_admin`,
//     adminToUser: (company_id: number, user_id: number) => `${invitation}/company/${company_id}/${user_id}/remove_from_admin`,
//     fired_from_the_company: (company_id: number, user_id: number) => `${invitation}/${company_id}/dismiss_employee/${user_id}`,
//     leave_company: (company_id: number) => `${invitation}/${company_id}/leave_company`,
//     admins: (company_id: number) => `${invitation}/action/${company_id}/get_list_of_admins`,
//