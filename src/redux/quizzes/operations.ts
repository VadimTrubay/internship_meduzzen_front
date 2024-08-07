import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCompanyQuizzes, deleteQuizApi, submitQuiz, getQuizById, editQuiz} from "../../api/api_quizzes";
import {QuizCompanyIdRequestType, QuizByIdResponseType} from "../../types/quizzesTypes";


export const addQuiz = createAsyncThunk(
  "quizzes/addQuiz",
  async (quizData: QuizCompanyIdRequestType, thunkAPI) => {
    try {
      const response = await submitQuiz(quizData);
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
      const response = await getCompanyQuizzes(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  "quizzes/getQuizById",
  async (id: string, thunkAPI) => {
    try {
      const response = await getQuizById(id);
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
      const response = await editQuiz(quizData);
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
