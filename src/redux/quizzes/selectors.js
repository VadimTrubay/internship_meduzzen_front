export const selectQuizzes = (state) => state.quizzes.items.quizzes;

export const selectQuizById = (state) => state.quizzes.quizById;

export const selectTotalCount = (state) => state.quizzes.items.total_count;

export const selectLoading = (state) => state.quizzes.loading;

export const selectError = (state) => state.quizzes.error;
