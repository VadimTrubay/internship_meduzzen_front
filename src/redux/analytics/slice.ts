import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCompanyMembersResults} from "./operations";
import {initialAnalyticsType} from "../../types/analyticsTypes";
import toast from "react-hot-toast";


const initialAnalytics: initialAnalyticsType = {
  companyMembersResults: {},
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

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: initialAnalytics,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCompanyMembersResults.pending, handlePending)
      .addCase(fetchCompanyMembersResults.fulfilled, handleFetchCompanyMembersResults)
      .addCase(fetchCompanyMembersResults.rejected, handleRejected)
});

export const analyticsReducer = analyticsSlice.reducer;
