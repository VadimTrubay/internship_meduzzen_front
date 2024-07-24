import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {initialActionsType, memberType} from "../../types/actionsTypes";
import {fetchMembers} from "./operations";

const initialActions: initialActionsType = {
  members: [],
  loading: false,
  error: "",
};

const handlePending = (state: initialActionsType) => {
  state.loading = true;
};

const handleRejected = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = action.payload;
  toast.error(`Error operation`);
};

const handleFetchMembersFulfilled = (
  state: initialActionsType,
  action: PayloadAction<memberType[]>
) => {
  state.loading = false;
  state.error = "";
  state.members = action.payload;
};

const actionsSlice = createSlice({
  name: "actions",
  initialState: initialActions,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchMembers.pending, handlePending)
      .addCase(fetchMembers.fulfilled, handleFetchMembersFulfilled)
      .addCase(fetchMembers.rejected, handleRejected)
});

export const actionsReducer = actionsSlice.reducer;
