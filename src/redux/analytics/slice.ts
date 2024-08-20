import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCompanyMembersResults, fetchMyQuizzesResults} from "./operations";
import {initialAnalyticsType} from "../../types/analyticsTypes";
import toast from "react-hot-toast";


const initialAnalytics: initialAnalyticsType = {
  companyMembersResults: { data: {} },
  myQuizzesResults: [],
  loading: false,
  error: null,
};

const handlePending = (state: initialAnalyticsType) => {
  state.loading = true;
};

const handleRejected = (state: initialAnalyticsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  toast.error(action.payload);
};

const handleFetchCompanyMembersResults = (state: initialAnalyticsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.companyMembersResults = action.payload;
};

const handleFetchMyQuizzesResults = (state: initialAnalyticsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.myQuizzesResults = action.payload;
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: initialAnalytics,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCompanyMembersResults.pending, handlePending)
      .addCase(fetchCompanyMembersResults.fulfilled, handleFetchCompanyMembersResults)
      .addCase(fetchCompanyMembersResults.rejected, handleRejected)
      .addCase(fetchMyQuizzesResults.pending, handlePending)
      .addCase(fetchMyQuizzesResults.fulfilled, handleFetchMyQuizzesResults)
      .addCase(fetchMyQuizzesResults.rejected, handleRejected)
});

export const analyticsReducer = analyticsSlice.reducer;
