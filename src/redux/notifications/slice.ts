import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {initialNotificationsType} from "../../types/notificationsTypes";
import {fetchMyNotifications, markAsReadNotifications} from "./operations";


const initialNotifications: initialNotificationsType = {
  items: [],
  loading: false,
  error: null,
};

const handlePending = (state: initialNotificationsType) => {
  state.loading = true;
};

const handleRejected = (state: initialNotificationsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  toast.error(action.payload);
};

const handleFetchMyNotificationsFulfilled = (state: initialNotificationsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
};

const handleMarkAsReadNotificationsFulfilled = (state: initialNotificationsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items = state.items.filter(notification => notification.id !== action.payload.id);
  toast.success(`Notification mark as read successfully`);
};


const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialNotifications,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchMyNotifications.pending, handlePending)
      .addCase(fetchMyNotifications.fulfilled, handleFetchMyNotificationsFulfilled)
      .addCase(fetchMyNotifications.rejected, handleRejected)
      .addCase(markAsReadNotifications.pending, handlePending)
      .addCase(markAsReadNotifications.fulfilled, handleMarkAsReadNotificationsFulfilled)
      .addCase(markAsReadNotifications.rejected, handleRejected)

});

export const notificationsReducer = notificationsSlice.reducer;
