import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";
import {exportDataType, sendResultsRequestType} from "../types/resultsTypes";


export const sendResultsApi = async (resultsData: sendResultsRequestType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.results.sendResults(resultsData.quiz_id), resultsData.data);
};

export const getCompanyRatingApi = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.results.companyRating(companyId));
};

export const getGlobalRatingApi = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.results.globalRating);
};

export const getMyResultsApi = async (): Promise<AxiosResponse<Blob>> => {
  return await axiosInstance.get(mainUrls.results.exportMyResults, {
    responseType: 'blob'
  });
};

export const getCompanyResultsApi = async (companyId: string): Promise<AxiosResponse<Blob>> => {
  return await axiosInstance.get(mainUrls.results.exportCompanyResults(companyId), {
    responseType: 'blob'
  });
}

export const getUserCompanyResultsApi = async (exportData: exportDataType): Promise<AxiosResponse<Blob>> => {
  const {companyId, userId} = exportData;
  return await axiosInstance.get(mainUrls.results.exportUserCompanyResults(companyId, userId), {
    responseType: 'blob'
  });
}
