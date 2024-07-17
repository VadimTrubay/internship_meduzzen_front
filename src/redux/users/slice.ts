import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteUserById, fetchUserById, fetchUsers} from "./operations";
import {initialUsersType} from "../../types/usersTypes";

const initialUsers: initialUsersType = {
  items: [],
  userById: null,
  totalCount: null,
  loading: false,
  error: null,
};

const handlePending = (state: initialUsersType) => {
  state.loading = true;
};

const handleRejected = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = action.payload;
};

const handleFetchUsersFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
  state.totalCount = action.payload.total_count;
};

const handleGetUserByIdFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.userById = action.payload;
};


const handleDeleteUserByIdFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.items = state.items.filter((user) => user.id !== action.payload);
};


const usersSlice = createSlice({
  name: "users",
  initialState: initialUsers,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, handleFetchUsersFulfilled)
      .addCase(fetchUsers.rejected, handleRejected)
      .addCase(fetchUserById.pending, handlePending)
      .addCase(fetchUserById.fulfilled, handleGetUserByIdFulfilled)
      .addCase(fetchUserById.rejected, handleRejected)
      .addCase(deleteUserById.pending, handlePending)
      .addCase(deleteUserById.fulfilled, handleDeleteUserByIdFulfilled)
      .addCase(deleteUserById.rejected, handleRejected)
});

export const usersReducer = usersSlice.reducer;
