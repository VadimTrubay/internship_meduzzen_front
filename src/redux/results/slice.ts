import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  fetchCompanyRating,
  fetchCompanyResults,
  fetchGlobalRating,
  fetchMyResults,
  fetchUserCompanyResults,
  sendResults
} from "./operations";
import toast from "react-hot-toast";
import {initialResultsType} from "../../types/resultsTypes";


const initialResults: initialResultsType = {
  quizResults: null,
  companyRating: 0,
  globalRating: 0,
  loading: false,
  error: null,
};

const handlePending = (state: initialResultsType) => {
  state.loading = true;
};

const handleRejected = (state: initialResultsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  toast.error(action.payload);
};

const handleFetchCompanyRatingFulfilled = (state: initialResultsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.companyRating = action.payload;
};

const handleFetchGlobalRatingFulfilled = (state: initialResultsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.globalRating = action.payload;
};

const handleSendResultsFulfilled = (state: initialResultsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.quizResults = action.payload;
  toast.success(`Results send successfully`);
};

const handleFetchMyResultsFulfilled = (state: initialResultsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
};

const handleFetchCompanyResultsFulfilled = (state: initialResultsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
};

const
  handleFetchUserCompanyResultsFulfilled = (state: initialResultsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
};

const resultsSlice = createSlice({
  name: "results",
  initialState: initialResults,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(sendResults.pending, handlePending)
      .addCase(sendResults.fulfilled, handleSendResultsFulfilled)
      .addCase(sendResults.rejected, handleRejected)
      .addCase(fetchCompanyRating.pending, handlePending)
      .addCase(fetchCompanyRating.fulfilled, handleFetchCompanyRatingFulfilled)
      .addCase(fetchCompanyRating.rejected, handleRejected)
      .addCase(fetchGlobalRating.pending, handlePending)
      .addCase(fetchGlobalRating.fulfilled, handleFetchGlobalRatingFulfilled)
      .addCase(fetchGlobalRating.rejected, handleRejected)
      .addCase(fetchMyResults.pending, handlePending)
      .addCase(fetchMyResults.fulfilled, handleFetchMyResultsFulfilled)
      .addCase(fetchMyResults.rejected, handleRejected)
      .addCase(fetchCompanyResults.pending, handlePending)
      .addCase(fetchCompanyResults.fulfilled, handleFetchCompanyResultsFulfilled)
      .addCase(fetchCompanyResults.rejected, handleRejected)
      .addCase(fetchUserCompanyResults.pending, handlePending)
      .addCase(fetchUserCompanyResults.fulfilled, handleFetchUserCompanyResultsFulfilled)
      .addCase(fetchUserCompanyResults.rejected, handleRejected)
});

export const resultsReducer = resultsSlice.reducer;
