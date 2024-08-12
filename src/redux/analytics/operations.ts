import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCompanyMembersResults} from "../../api/api_analytics";


export const fetchCompanyMembersResults = createAsyncThunk(
  "analytics/fetchCompanyMembersResults",
  async (id: string, thunkAPI) => {
    try {
      const response = await getCompanyMembersResults(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

// export const fetchQuizById = createAsyncThunk(
//   "quizzes/getQuizById",
//   async (id: string, thunkAPI) => {
//     try {
//       const response = await getQuizById(id);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data.detail);
//     }
//   }
// );