export const selectUsers = (state) => state.users.items.users;

export const selectUserById = (state) => state.users.userById;

export const selectTotalCount = (state) => state.users.totalCount;

export const selectLoading = (state) => state.users.loading;

export const selectError = (state) => state.users.error;
