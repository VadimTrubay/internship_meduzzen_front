import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";
import {QuizCompanyIdRequestType} from "../types/quizzesTypes";


export const submitQuiz = async (quizData: QuizCompanyIdRequestType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.quizzes.submit(quizData.companyId), quizData.quizData);
};

export const getCompanyQuizzes = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.quizzes.companyQuizzes(companyId));
};

export const deleteQuizApi = async (quizId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.quizzes.deleteQuiz(quizId));
};

