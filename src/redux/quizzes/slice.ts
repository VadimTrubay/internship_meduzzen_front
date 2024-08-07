import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteQuiz, fetchQuizzes, addQuiz, fetchQuizById} from "./operations";
import {initialQuizzesType} from "../../types/quizzesTypes";
import toast from "react-hot-toast";


const initialQuizzes: initialQuizzesType = {
  items: {
    quizzes: [],
    total_count: 0,
  },
  quizById: null,
  loading: false,
  error: null,
};

const handlePending = (state: initialQuizzesType) => {
  state.loading = true;
};

const handleRejected = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  toast.error(action.payload);
};

const handleFetchQuizzesFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
};

const handleGetQuizByIdFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.quizById = action.payload;
};

const handleAddQuizFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items.quizzes.push(action.payload);
  toast.success(`Quiz added successfully`);
};
//
// const handleGetCompanyByIdFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
//   state.loading = false;
//   state.error = null;
//   state.companyById = action.payload;
// };
//
// const handleUpdateCompanyFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
//   state.loading = false;
//   state.error = null;
//   const index = state.items.companies.findIndex((company) => company.id === action.payload.id);
//   if (index !== -1) {
//     state.items.companies[index] = {...state.items.companies[index], ...action.payload};
//   }
//   toast.success(`Company updated successfully`);
// };

const handleDeleteQuizFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items.quizzes = state.items.quizzes.filter((quiz) => quiz.id !== action.payload.id);
  state.quizById = null;
  toast.success(`Quiz deleted successfully`);
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: initialQuizzes,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchQuizzes.pending, handlePending)
      .addCase(fetchQuizzes.fulfilled, handleFetchQuizzesFulfilled)
      .addCase(fetchQuizzes.rejected, handleRejected)
      .addCase(fetchQuizById.pending, handlePending)
      .addCase(fetchQuizById.fulfilled, handleGetQuizByIdFulfilled)
      .addCase(fetchQuizById.rejected, handleRejected)
      .addCase(addQuiz.pending, handlePending)
      .addCase(addQuiz.fulfilled, handleAddQuizFulfilled)
      .addCase(addQuiz.rejected, handleRejected)
      // .addCase(updateCompany.pending, handlePending)
      // .addCase(updateCompany.fulfilled, handleUpdateCompanyFulfilled)
      // .addCase(updateCompany.rejected, handleRejected)
      .addCase(deleteQuiz.pending, handlePending)
      .addCase(deleteQuiz.fulfilled, handleDeleteQuizFulfilled)
      .addCase(deleteQuiz.rejected, handleRejected),
});

export const quizzesReducer = quizzesSlice.reducer;
