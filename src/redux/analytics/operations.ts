import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCompanyMembersResultsApi, getMyQuizzesResultsApi} from "../../api/api_analytics";


export const fetchCompanyMembersResults = createAsyncThunk(
  "analytics/fetchCompanyMembersResults",
  async (id: string, thunkAPI) => {
    try {
      const response = await getCompanyMembersResultsApi(id);
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
      const response = await getMyQuizzesResultsApi();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);