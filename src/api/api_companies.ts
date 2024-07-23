import axios, {AxiosResponse} from "axios";
import {baseURL} from "../utils/process_base_url";
import {get_access_token_from_state} from "../utils/get_access_token_from_state";
import {CompanyAddType, CompanyUpdateType} from "../types/companiesTypes";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {mainUrls} from "../config/urls";

axios.defaults.baseURL = baseURL;


export const submitCompany = async (companyData: CompanyAddType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.post(mainUrls.companies.submit, companyData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getCompanies = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axios.get(mainUrls.companies.all(skip, limit));
};

export const getCompanyById = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.get(mainUrls.companies.byId(id), {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const editCompany = async (companyData: CompanyUpdateType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);
  const {id} = companyData;
  return await axios.patch(mainUrls.companies.byId(id), companyData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const removeCompany = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.delete(mainUrls.companies.byId(id), {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
