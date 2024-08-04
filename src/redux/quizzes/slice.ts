import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCompanyQuizzes} from "./operations";
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

const handleFetchCompanyQuizzesFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
};

// const handleAddCompanyFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
//   state.loading = false;
//   state.error = null;
//   state.items.companies.push(action.payload);
//   toast.success(`Company added successfully`);
// };
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
//
// const handleDeleteCompanyByIdFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
//   state.loading = false;
//   state.error = null;
//   state.items.companies = state.items.companies.filter((company) => company.id !== action.payload.id);
//   state.companyById = null;
//   toast.success(`Company deleted successfully`);
// };

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: initialQuizzes,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCompanyQuizzes.pending, handlePending)
      .addCase(fetchCompanyQuizzes.fulfilled, handleFetchCompanyQuizzesFulfilled)
      .addCase(fetchCompanyQuizzes.rejected, handleRejected)
  // .addCase(fetchCompanyById.pending, handlePending)
  // .addCase(fetchCompanyById.fulfilled, handleGetCompanyByIdFulfilled)
  // .addCase(fetchCompanyById.rejected, handleRejected)
  // .addCase(addCompany.pending, handlePending)
  // .addCase(addCompany.fulfilled, handleAddCompanyFulfilled)
  // .addCase(addCompany.rejected, handleRejected)
  // .addCase(updateCompany.pending, handlePending)
  // .addCase(updateCompany.fulfilled, handleUpdateCompanyFulfilled)
  // .addCase(updateCompany.rejected, handleRejected)
  // .addCase(deleteCompanyById.pending, handlePending)
  // .addCase(deleteCompanyById.fulfilled, handleDeleteCompanyByIdFulfilled)
  // .addCase(deleteCompanyById.rejected, handleRejected),
});

export const quizzesReducer = quizzesSlice.reducer;
