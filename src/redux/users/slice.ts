import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteUserById, fetchUserById, fetchUsers} from "./operations";
import {initialUsersType, UserType} from "../../types/usersTypes";
import toast from "react-hot-toast";

const initialUsers: initialUsersType = {
  items: [],
  userById: null,
  totalCount: null,
  loading: false,
  error: "",
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
  toast.error(`Error operation`);
};

const handleFetchUsersFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = "";
  state.items = action.payload;
  state.totalCount = action.payload.total_count;
};

const handleGetUserByIdFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = "";
  state.userById = action.payload;
};


const handleDeleteUserByIdFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = "";
  state.items = state.items.filter((user) => user.id !== action.payload);
  toast.error(`User deleted successfully`);
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
