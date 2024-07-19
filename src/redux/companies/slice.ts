import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteCompanyById, fetchCompanyById, fetchCompanies, updateCompany} from "./operations";
import {initialCompaniesType, CompanyType, CompanyUpdateType} from "../../types/companiesTypes";
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
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = "";
  state.items = action.payload;
  state.totalCount = action.payload.total_count;
};

const handleGetCompanyByIdFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = "";
  state.companyById = action.payload;
};

const handleUpdateCompanyFulfilled = (state: initialCompaniesType, action: PayloadAction<CompanyUpdateType>) => {
  state.loading = false;
  state.error = "";
  // state.company.name = action.payload.name;
  toast.success(`Company updated successfully`);
};


const handleDeleteCompanyByIdFulfilled = (
  state: initialCompaniesType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = "";
  state.items = state.items.filter((company) => company.id !== action.payload);
  toast.error(`Companies deleted successfully`);
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
      .addCase(updateCompany.pending, handlePending)
      .addCase(updateCompany.fulfilled, handleUpdateCompanyFulfilled)
      .addCase(updateCompany.rejected, handleRejected)
      .addCase(deleteCompanyById.pending, handlePending)
      .addCase(deleteCompanyById.fulfilled, handleDeleteCompanyByIdFulfilled)
      .addCase(deleteCompanyById.rejected, handleRejected)
});

export const companiesReducer = companiesSlice.reducer;
