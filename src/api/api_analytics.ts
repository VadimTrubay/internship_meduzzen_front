import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";


export const getCompanyMembersResults = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.analytics.companyMembersResults(companyId));
};

export const getMyQuizzesResults = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.analytics.myQuizzesResults);
};