import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {baseURL} from "../../utils/process_base_url";
import {
  CompanyAddType,
  CompanyType,
  CompanyUpdateType,
  FetchCompaniesParams
} from "../../types/companiesTypes";
import {get_access_token_from_state} from "../../utils/get_access_token_from_state";

axios.defaults.baseURL = baseURL;

export const addCompany = createAsyncThunk<
  CompanyType,
  CompanyAddType,
  { state: RootState }
>(
  "companies/addCompany",
  async ({name, description, visible}, thunkAPI) => {
    const access_token = get_access_token_from_state(thunkAPI);
    try {
      const response = await axios.post("/companies", {name, description, visible}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCompanies = createAsyncThunk<
  { items: CompanyType[], total_count: number },
  FetchCompaniesParams
>(
  "companies/fetchCompanies",
  async ({skip, limit}, thunkAPI) => {
    try {
      const response = await axios.get(`/companies?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCompanyById = createAsyncThunk<
  CompanyType,
  string,
  { state: RootState }
>(
  "companies/getCompanyById",
  async (id: string, thunkAPI) => {
    const access_token = get_access_token_from_state(thunkAPI);
    try {
      const response = await axios.get(`/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCompany = createAsyncThunk<
  CompanyType,
  CompanyUpdateType,
  { state: RootState }
>(
  "companies/updateCompany",
  async ({id, name, description, visible}, thunkAPI) => {
    const access_token = get_access_token_from_state(thunkAPI);
    try {
      const response = await axios.patch(`/companies/${id}`, {name, description, visible}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCompanyById = createAsyncThunk<
  string,
  string,
  { state: RootState }
>(
  "companies/deleteCompany",
  async (id: string, thunkAPI) => {
    const access_token = get_access_token_from_state(thunkAPI);
    try {
      const response = await axios.delete(`/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
