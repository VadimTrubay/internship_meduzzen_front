import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  CompanyAddType,
  CompanyUpdateType,
  FetchCompaniesParams
} from "../../types/companiesTypes";
import {editCompany, getCompanies, getCompanyById, removeCompany, submitCompany} from "../../api/api_companies";


export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (companyData: CompanyAddType, thunkAPI) => {
    try {
      const response = await submitCompany(companyData, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async ({skip, limit}: FetchCompaniesParams, thunkAPI) => {
    try {
      const response = await getCompanies(skip, limit)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  "companies/getCompanyById",
  async (id: string, thunkAPI) => {
    try {
      const response = await getCompanyById(id, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (companyData: CompanyUpdateType, thunkAPI) => {
    try {
      const response = await editCompany(companyData, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCompanyById = createAsyncThunk(
  "companies/deleteCompany",
  async (id: string, thunkAPI) => {
    try {
      const response = await removeCompany(id, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
