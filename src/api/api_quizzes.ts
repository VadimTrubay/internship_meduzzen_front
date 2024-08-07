import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";
import {QuizCompanyIdRequestType, QuizByIdResponseType} from "../types/quizzesTypes";


export const submitQuiz = async (quizData: QuizCompanyIdRequestType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.quizzes.submit(quizData.companyId), quizData.quizData);
};

export const getCompanyQuizzes = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.quizzes.companyQuizzes(companyId));
};

export const getQuizById = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.quizzes.byId(id));
};

export const editQuiz = async (quizData: QuizByIdResponseType): Promise<AxiosResponse> => {
  const {id} = quizData;
  return await axiosInstance.patch(mainUrls.quizzes.byId(id), quizData);
};

export const deleteQuizApi = async (quizId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.quizzes.deleteQuiz(quizId));
};

