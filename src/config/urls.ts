export const auth = "/auth";
export const users = "/users";
export const companies = "/companies";
export const actions = "/actions";
export const quizzes = "/quizzes";
export const results = "/results";
export const analytics = "/analytics";
export const notifications = "/notifications";


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
    sendInvite: (companyId: string, userId: string) => `${actions}/company/${companyId}/invite/user/${userId}`,
    deleteInvite: (actionId: string) => `${actions}/${actionId}/invite`,
    acceptInvite: (actionId: string) => `${actions}/${actionId}/invite/accept`,
    declineInvite: (actionId: string) => `${actions}/${actionId}/invite/decline`,
    sendRequest: (companyId: string, userId: string) => `${actions}/company/${companyId}/request/user/${userId}`,
    deleteRequest: (actionId: string) => `${actions}/${actionId}/request`,
    acceptRequest: (actionId: string) => `${actions}/${actionId}/request/accept`,
    declineRequest: (actionId: string) => `${actions}/${actionId}/request/decline`,
    leave: (actionId: string) => `${actions}/${actionId}/leave`,
    kick: (actionId: string) => `${actions}/${actionId}/kick`,
    companyInvites: (companyId: string) => `${actions}/company/${companyId}/invites`,
    companyRequests: (companyId: string) => `${actions}/company/${companyId}/requests`,
    membersCompany: (companyId: string) => `${actions}/company/${companyId}/members`,
    adminsCompany: (companyId: string) => `${actions}/company/${companyId}/admins`,
    addAdminRole: (companyId: string, userId: string) => `${actions}/company/${companyId}/add/admin/user/${userId}`,
    removeAdminRole: (companyId: string, userId: string) => `${actions}/company/${companyId}/remove/admin/user/${userId}`,
  },
  quizzes: {
    viewQuiz: (quizId: string) => `${quizzes}/quiz/view/${quizId}`,
    byId: (quizId: string) => `${quizzes}/quiz/${quizId}`,
    submit: (companyId: string) => `${quizzes}/company/${companyId}`,
    companyQuizzes: (companyId: string) => `${quizzes}/company/${companyId}`,
    deleteQuiz: (quizId: string) => `${quizzes}/quiz/${quizId}`,

  },
  results: {
    globalRating: `${results}/global_rating`,
    exportMyResults: `${results}/export/me?file_format=csv`,
    exportCompanyResults: (companyId: string) => `${results}/export/company/${companyId}?file_format=csv`,
    exportUserCompanyResults: (companyId: string, userId: string) => `${results}/export/company/${companyId}/user/${userId}?file_format=csv`,
    sendResults: (quizId: string) => `${results}/create/${quizId}`,
    companyRating: (companyId: string) => `${results}/company/${companyId}/rating`,

  },
  analytics: {
    myQuizzesAnalytics: `${analytics}/my/quizzes`,
    myQuizzesResults: `${analytics}/my/quizzes/results`,
    companyMembersResults: (companyId: string) => `${analytics}/company/${companyId}/members_results`,
  },
  notifications: {
    all: `${notifications}/me`,
    markAsRead: (notificationId: string) => `${notifications}/${notificationId}/mark_as_read`,
  },
}
