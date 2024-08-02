import axios, {AxiosResponse} from "axios";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import {CompanyAddType, CompanyUpdateType} from "../types/companiesTypes";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {mainUrls} from "../config/urls";


export const submitCompany = async (companyData: CompanyAddType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);
  return await axiosInstance.post(mainUrls.companies.submit, companyData);
};

export const getCompanies = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axios.get(mainUrls.companies.all(skip, limit));
};

export const getCompanyById = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);
  return await axiosInstance.get(mainUrls.companies.byId(id));
};

export const editCompany = async (companyData: CompanyUpdateType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);
  const {id} = companyData;
  return await axiosInstance.patch(mainUrls.companies.byId(id), companyData);
};

export const removeCompany = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);
  return await axiosInstance.delete(mainUrls.companies.byId(id));
};
