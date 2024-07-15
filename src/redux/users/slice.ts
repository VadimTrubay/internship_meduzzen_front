import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./operations";
import {initialUsersType, UserType} from "../../types/usersTypes";

const initialUsers: initialUsersType = {
  items: [],
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
  action: PayloadAction<UserType[]>
) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
  state.totalCount = action.payload.total_count;
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
});

export const usersReducer = usersSlice.reducer;
