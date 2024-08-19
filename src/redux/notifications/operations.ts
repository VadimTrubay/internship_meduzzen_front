import {createAsyncThunk} from '@reduxjs/toolkit';
import {getMyNotificationsApi, markAsReadNotificationsApi} from "../../api/apiNotifications";



export const fetchMyNotifications = createAsyncThunk(
  "notifications/fetchMyNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await getMyNotificationsApi();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const markAsReadNotifications = createAsyncThunk(
  "notifications/markAsReadNotifications",
  async (notificationId: string, thunkAPI) => {
    try {
      const response = await markAsReadNotificationsApi(notificationId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

