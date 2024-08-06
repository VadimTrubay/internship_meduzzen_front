import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCompanyQuizzes, deleteQuizApi, submitQuiz} from "../../api/api_quizzes";
import {QuizCompanyIdRequestType} from "../../types/quizzesTypes";


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

// export const fetchCompanyById = createAsyncThunk(
//   "companies/getCompanyById",
//   async (id: string, thunkAPI) => {
//     try {
//       const response = await getCompanyById(id);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data.detail);
//     }
//   }
// );
//
// export const updateCompany = createAsyncThunk(
//   "companies/updateCompany",
//   async (companyData: CompanyUpdateType, thunkAPI) => {
//     try {
//       const response = await editCompany(companyData);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data.detail);
//     }
//   }
// );

