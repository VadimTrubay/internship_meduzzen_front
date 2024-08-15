import {createAsyncThunk} from '@reduxjs/toolkit';
import {CompanyAddType, CompanyUpdateType, FetchCompaniesParams} from '../../types/companiesTypes';
import {
  editCompanyApi,
  getCompaniesApi,
  getCompanyByIdApi,
  removeCompanyApi,
  submitCompanyApi
} from '../../api/apiCompanies';

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (companyData: CompanyAddType, thunkAPI) => {
    try {
      const response = await submitCompanyApi(companyData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async ({skip, limit}: FetchCompaniesParams, thunkAPI) => {
    try {
      const response = await getCompaniesApi(skip, limit);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  "companies/fetchCompanyById",
  async (id: string, thunkAPI) => {
    try {
      const response = await getCompanyByIdApi(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (companyData: CompanyUpdateType, thunkAPI) => {
    try {
      const response = await editCompanyApi(companyData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const deleteCompanyById = createAsyncThunk(
  "companies/deleteCompany",
  async (id: string, thunkAPI) => {
    try {
      const response = await removeCompanyApi(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);
