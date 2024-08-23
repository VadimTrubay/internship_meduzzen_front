import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getCompanyQuizzesApi,
  deleteQuizApi,
  submitQuizApi,
  getQuizByIdApi,
  editQuizApi, sendExelFileApi
} from "../../api/apiQuizzes";
import {QuizCompanyIdRequestType, QuizByIdResponseType} from "../../types/quizzesTypes";


export const addQuiz = createAsyncThunk(
  "quizzes/addQuiz",
  async (quizData: QuizCompanyIdRequestType, thunkAPI) => {
    try {
      const response = await submitQuizApi(quizData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async (id: string, thunkAPI) => {
    try {
      const response = await getCompanyQuizzesApi(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  "quizzes/fetchQuizById",
  async (id: string, thunkAPI) => {
    try {
      const response = await getQuizByIdApi(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const updateQuiz = createAsyncThunk(
  "quizzes/updateQuiz",
  async (quizData: QuizByIdResponseType, thunkAPI) => {
    try {
      const response = await editQuizApi(quizData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quizzes/deleteCompanyQuiz",
  async (id: string, thunkAPI) => {
    try {
      const response = await deleteQuizApi(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const sendExelFile = createAsyncThunk(
  "quizzes/sendExelFile",
  async ({ companyId, file }: { companyId: string; file: FormData }, thunkAPI) => {
    try {
      const response = await sendExelFileApi(companyId, file);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);
