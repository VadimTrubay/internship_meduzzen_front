import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendResultsRequestType} from "../../types/resultsTypes";
import {getCompanyRatingApi, getGlobalRatingApi, sendResultsApi} from "../../api/api_results";


export const sendResults = createAsyncThunk(
  "results/sendResults",
  async (resultsData: sendResultsRequestType, thunkAPI) => {
    try {
      const response = await sendResultsApi(resultsData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchCompanyRating = createAsyncThunk(
  "results/fetchCompanyRating",
  async (id: string, thunkAPI) => {
    try {
      const response = await getCompanyRatingApi(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchGlobalRating = createAsyncThunk(
  "results/fetchGlobalRating",
  async (_, thunkAPI) => {
    try {
      const response = await getGlobalRatingApi();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

