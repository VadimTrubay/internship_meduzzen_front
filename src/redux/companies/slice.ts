import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  deleteCompanyById,
  fetchCompanyById,
  fetchCompanies,
  updateCompany,
  addCompany,
} from "./operations";
import {initialCompaniesType} from "../../types/companiesTypes";
import toast from "react-hot-toast";

const initialCompanies: initialCompaniesType = {
  items: {
    companies: [],
    total_count: 0,
  },
  companyById: null,
  loading: false,
  error: null,
};

const handlePending = (state: initialCompaniesType) => {
  state.loading = true;
};

const handleRejected = (state: initialCompaniesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  toast.error(action.payload);
};

const handleFetchCompaniesFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
};

const handleAddCompanyFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items.companies.push(action.payload);
  toast.success(`Company added successfully`);
};

const handleGetCompanyByIdFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.companyById = action.payload;
};

const handleUpdateCompanyFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  const index = state.items.companies.findIndex((company) => company.id === action.payload.id);
  if (index !== -1) {
    state.items.companies[index] = {...state.items.companies[index], ...action.payload};
  }
  toast.success(`Company updated successfully`);
};

const handleDeleteCompanyByIdFulfilled = (state: initialCompaniesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items.companies = state.items.companies.filter((company) => company.id !== action.payload.id);
  state.companyById = null;
  toast.success(`Company deleted successfully`);
};

const companiesSlice = createSlice({
  name: "companies",
  initialState: initialCompanies,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCompanies.pending, handlePending)
      .addCase(fetchCompanies.fulfilled, handleFetchCompaniesFulfilled)
      .addCase(fetchCompanies.rejected, handleRejected)
      .addCase(fetchCompanyById.pending, handlePending)
      .addCase(fetchCompanyById.fulfilled, handleGetCompanyByIdFulfilled)
      .addCase(fetchCompanyById.rejected, handleRejected)
      .addCase(addCompany.pending, handlePending)
      .addCase(addCompany.fulfilled, handleAddCompanyFulfilled)
      .addCase(addCompany.rejected, handleRejected)
      .addCase(updateCompany.pending, handlePending)
      .addCase(updateCompany.fulfilled, handleUpdateCompanyFulfilled)
      .addCase(updateCompany.rejected, handleRejected)
      .addCase(deleteCompanyById.pending, handlePending)
      .addCase(deleteCompanyById.fulfilled, handleDeleteCompanyByIdFulfilled)
      .addCase(deleteCompanyById.rejected, handleRejected),
});

export const companiesReducer = companiesSlice.reducer;
