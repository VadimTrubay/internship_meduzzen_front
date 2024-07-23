import axios, {AxiosResponse} from "axios";
import {baseURL} from "../utils/process_base_url";
import {get_access_token_from_state} from "../utils/get_access_token_from_state";
import {CompanyAddType, CompanyUpdateType} from "../types/companiesTypes";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";

axios.defaults.baseURL = baseURL;


export const submitCompany = async (companyData: CompanyAddType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.post(`/companies`, companyData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getCompanies = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axios.get(`/companies?skip=${skip}&limit=${limit}`);
};

export const getCompanyById = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.get(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const editCompany = async (companyData: CompanyUpdateType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);
  const {id} = companyData;
  return await axios.patch(`/companies/${id}`, companyData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const removeCompany = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.delete(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
