import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteUser, fetchUserById, fetchUsers} from "./operations";
import {initialUsersType} from "../../types/usersTypes";
import toast from "react-hot-toast";

const initialUsers: initialUsersType = {
  items: {
    users: [],
    total_count: 0,
  },
  userById: null,
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
  toast.error(action.payload);
};

const handleFetchUsersFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
};

const handleGetUserByIdFulfilled = (
  state: initialUsersType,
  action: PayloadAction<null>
) => {
  state.loading = false;
  state.error = null;
  state.userById = action.payload;
};


const handleDeleteUserFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.items.users = state.items.users.filter((user) => user.id !== action.payload.id);
  toast.success(`User deleted successfully`);
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
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, handleDeleteUserFulfilled)
      .addCase(deleteUser.rejected, handleRejected)
});

export const usersReducer = usersSlice.reducer;
