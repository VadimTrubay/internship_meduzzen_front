import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";
import {sendResultsRequestType} from "../types/resultsTypes";


export const sendResultsApi = async (resultsData: sendResultsRequestType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.results.sendResults(resultsData.quiz_id), resultsData.data);
};

export const getCompanyRatingApi = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.results.companyRating(companyId));
};

export const getGlobalRatingApi = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.results.globalRating);
};


