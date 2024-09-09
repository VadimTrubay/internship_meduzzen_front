import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";
import {QuizCompanyIdRequestType, QuizByIdResponseType} from "../types/quizzesTypes";


export const submitQuizApi = async (quizData: QuizCompanyIdRequestType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.quizzes.submit(quizData.companyId), quizData.data);
};

export const getCompanyQuizzesApi = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.quizzes.companyQuizzes(companyId));
};

export const getQuizByIdApi = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.quizzes.byId(id));
};

export const editQuizApi = async (quizData: QuizByIdResponseType): Promise<AxiosResponse> => {
  return await axiosInstance.patch(mainUrls.quizzes.byId(quizData.id), quizData);
};

export const deleteQuizApi = async (quizId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.quizzes.deleteQuiz(quizId));
};

export const sendExelFileApi = async (companyId: string, file: FormData): Promise<AxiosResponse<Blob>> => {
  return await axiosInstance.post(mainUrls.quizzes.sendExelFile(companyId), file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

