import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUserById, fetchUsers} from "./operations";
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
  state.items = action.payload;
  state.totalCount = action.payload.total_count;
  state.loading = false;
};

const getUserByIdFulfilled = (
  state: initialUsersType,
  action: PayloadAction<any>
) => {
  state.userById = action.payload;
  state.loading = false;
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
      .addCase(fetchUserById.fulfilled, getUserByIdFulfilled)
      .addCase(fetchUserById.rejected, handleRejected)
});

export const usersReducer = usersSlice.reducer;
