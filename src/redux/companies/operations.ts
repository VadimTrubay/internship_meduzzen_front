import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {baseURL} from "../../utils/process_base_url"
import {CompanyDeleteType, CompanyUpdateType, FetchCompaniesParams} from "../../types/companiesTypes";

axios.defaults.baseURL = baseURL;


export const fetchCompanies = createAsyncThunk(
  "companies/",
  async ({skip, limit}: FetchCompaniesParams, thunkAPI) => {
    try {
      const response = await axios.get(`/companies?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCompanyById = createAsyncThunk<
  any,
  CompanyUpdateType,
  { state: RootState }
>(
  "companies/getCompanyById",
  async (id: CompanyUpdateType, thunkAPI) => {
    const state = thunkAPI.getState();
    const access_token = state.auth.access_token;
    if (access_token === null) {
      return thunkAPI.rejectWithValue("Unable to edit company");
    }
    try {
      const response = await axios.get(`/companies/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const updateCompany = createAsyncThunk<
  any,
  CompanyUpdateType,
  { state: RootState }
>(
  "companies/editUsername",
  async ({id, name, description, is_visible}: CompanyUpdateType, thunkAPI) => {
    const state = thunkAPI.getState();
    const access_token = state.auth.access_token;
    if (access_token === null) {
      return thunkAPI.rejectWithValue("Unable to edit company");
    }
    try {
      const res = await axios.patch(`/companies/${id}`, {name, description, is_visible}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const deleteCompanyById = createAsyncThunk<
  any,
  CompanyDeleteType,
  { state: RootState }
>(
  "companies/deleteUser",
  async (id: CompanyDeleteType, thunkAPI) => {
    const state = thunkAPI.getState();
    const access_token = state.auth.access_token;
    if (access_token === null) {
      return thunkAPI.rejectWithValue("Unable to edit company");
    }
    try {
      const res = await axios.delete(`/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
