import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCompanyMembersResults, getMyQuizzesResults} from "../../api/api_analytics";


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

export const fetchMyQuizzesResults = createAsyncThunk(
  "analytics/fetchMyQuizzesResults",
  async (_, thunkAPI) => {
    try {
      const response = await getMyQuizzesResults();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);