import {AxiosResponse} from 'axios';
import {CompanyAddType, CompanyUpdateType} from '../types/companiesTypes';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";

export const submitCompany = async (companyData: CompanyAddType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.companies.submit, companyData);
};

export const getCompanies = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.companies.all(skip, limit));
};

export const getCompanyById = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.companies.byId(id));
};

export const editCompany = async (companyData: CompanyUpdateType): Promise<AxiosResponse> => {
  return await axiosInstance.patch(mainUrls.companies.byId(companyData.id), companyData);
};

export const removeCompany = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.companies.byId(id));
};
