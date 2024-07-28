import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteCompanyById,
  fetchCompanyById,
  fetchCompanies,
  updateCompany,
  addCompany
} from "./operations";
import { initialCompaniesType, CompanyUpdateType, CompanyType } from "../../types/companiesTypes";


const initialCompanies: initialCompaniesType = {
  items: [],
  companyById: null,
  totalCount: 0,
  loading: false,
  error: null,
};

const handlePending = (state: initialCompaniesType) => {
  state.loading = true;
};

const handleRejected = (
  state: initialCompaniesType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = action.payload;
};

const handleFetchCompaniesFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
  state.totalCount = action.payload.total_count;
};

const handleAddCompanyFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<CompanyType>
) => {
  state.loading = false;
  state.error = null;
  state.items.companies.push(action.payload);
};

const handleGetCompanyByIdFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<null>
) => {
  state.loading = false;
  state.error = null;
  state.companyById = action.payload;
};

const handleUpdateCompanyFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<CompanyUpdateType>
) => {
  state.loading = false;
  state.error = null;
  const index = state.items.companies.findIndex(company => company.id === action.payload.id);
  if (index !== -1) {
    state.items[index] = { ...state.items[index], ...action.payload };
  }
};

const handleDeleteCompanyByIdFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<CompanyType>
) => {
  state.loading = false;
  state.error = null;
  state.items = state.items.companies.filter(company => company.id !== action.payload.id);
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
      .addCase(deleteCompanyById.rejected, handleRejected)
});

export const companiesReducer = companiesSlice.reducer;
