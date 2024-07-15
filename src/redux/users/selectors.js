export const selectUsers = (state) => state.users.items.users || [];

export const selectTotalCount = (state) => state.users.totalCount || null;

export const selectIsLoading = (state) => state.users.loading;

export const selectError = (state) => state.users.error;
