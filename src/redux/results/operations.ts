import {createAsyncThunk} from '@reduxjs/toolkit';
import {exportDataType, sendResultsRequestType} from "../../types/resultsTypes";
import {
  getCompanyRatingApi,
  getCompanyResultsApi,
  getGlobalRatingApi,
  getMyResultsApi,
  getUserCompanyResultsApi,
  sendResultsApi
} from "../../api/apiResults";
import {downloadFileData} from "../../utils/downloadFile";


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

export const fetchMyResults = createAsyncThunk(
  "results/fetchMyResults",
  async (_, thunkAPI) => {
    try {
      const response = await getMyResultsApi();
      downloadFileData(response)
      return {};
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const fetchCompanyResults = createAsyncThunk(
  "results/fetchCompanyResults",
  async (id: string, thunkAPI) => {
    try {
      const response = await getCompanyResultsApi(id);
      downloadFileData(response)
      return {};
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const fetchUserCompanyResults = createAsyncThunk(
  "results/fetchUserCompanyResults",
  async (exportData: exportDataType, thunkAPI) => {
    try {
      const response = await getUserCompanyResultsApi(exportData);
      downloadFileData(response)
      return {};
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
  }
);