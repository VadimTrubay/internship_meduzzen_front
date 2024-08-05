import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";
import {QuizCompanyRequestType} from "../types/quizzesTypes";


export const submitQuiz = async (quizData: QuizCompanyRequestType): Promise<AxiosResponse> => {
  const {companyId, ...data} = quizData;
  return await axiosInstance.post(mainUrls.quizzes.submit(companyId), data);
};

export const getCompanyQuizzes = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.quizzes.companyQuizzes(companyId));
};

export const deleteQuizApi = async (quizId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.quizzes.deleteQuiz(quizId));
};

