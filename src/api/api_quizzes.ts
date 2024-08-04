import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";


export const getCompanyQuizzes = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.quizzes.companyQuizzes(companyId));
};
