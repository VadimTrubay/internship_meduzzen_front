import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCompanyQuizzes} from "../../api/api_quizzes";

// export const addCompany = createAsyncThunk(
//   "companies/addCompany",
//   async (companyData: CompanyAddType, thunkAPI) => {
//     try {
//       const response = await submitCompany(companyData);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data.detail);
//     }
//   }
// );

export const fetchCompanyQuizzes = createAsyncThunk(
  "quizzes/fetchCompanyQuizzes",
  async (id: string, thunkAPI) => {
    try {
      const response = await getCompanyQuizzes(id);
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
//
// export const deleteCompanyById = createAsyncThunk(
//   "companies/deleteCompany",
//   async (id: string, thunkAPI) => {
//     try {
//       const response = await removeCompany(id);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data.detail);
//     }
//   }
// );
