import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteCompanyById,
  fetchCompanyById,
  fetchCompanies,
  updateCompany,
  addCompany
} from "./operations";
import { initialCompaniesType, CompanyUpdateType, CompanyType } from "../../types/companiesTypes";
import toast from "react-hot-toast";

const initialCompanies: initialCompaniesType = {
  items: [],
  companyById: null,
  totalCount: null,
  loading: false,
  error: "",
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
  toast.error(`Error operation`);
};

const handleFetchCompaniesFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<{ items: CompanyType[], total_count: number }>
) => {
  state.loading = false;
  state.error = "";
  state.items = action.payload;
  state.totalCount = action.payload.total_count;
};

const handleAddCompanyFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<CompanyType>
) => {
  state.loading = false;
  state.error = "";
  state.items.companies.push(action.payload);
  toast.success(`Company added successfully`);
};

const handleGetCompanyByIdFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<CompanyType>
) => {
  state.loading = false;
  state.error = "";
  state.companyById = action.payload;
};

const handleUpdateCompanyFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<CompanyUpdateType>
) => {
  state.loading = false;
  state.error = "";
  const index = state.items.findIndex(company => company.id === action.payload.id);
  if (index !== -1) {
    state.items[index] = { ...state.items[index], ...action.payload };
  }
  toast.success(`Company updated successfully`);
};

const handleDeleteCompanyByIdFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<string>
) => {
  state.loading = false;
  state.error = "";
  state.items = state.items.filter(company => company.id !== action.payload);
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
      .addCase(deleteCompanyById.rejected, handleRejected)
});

export const companiesReducer = companiesSlice.reducer;
