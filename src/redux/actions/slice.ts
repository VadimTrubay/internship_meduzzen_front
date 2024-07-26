import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {initialActionsType, memberType} from "../../types/actionsTypes";
import {acceptInvite, deleteMember, fetchMembers, fetchMyInvites} from "./operations";

const initialActions: initialActionsType = {
  members: [],
  myInvites: [],
  loading: false,
  error: null,
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
  state.error = null;
  state.members = action.payload;
};

const handleFetchMyInvitesFulfilled = (
  state: initialActionsType,
  action: PayloadAction<memberType[]>
) => {
  state.loading = false;
  state.error = null;
  state.myInvites = action.payload;
};

const handleAcceptInviteFulfilled = (
  state: initialActionsType
) => {
  state.loading = false;
  state.error = null;
  state.myInvites = [];
  toast.error(`Invite accepted successfully`);
};


const handleDeleteMemberFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.members = state.members.filter((member) => member.id !== action.payload.id);
  toast.error(`Member deleted successfully`);
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
      .addCase(fetchMyInvites.pending, handlePending)
      .addCase(fetchMyInvites.fulfilled, handleFetchMyInvitesFulfilled)
      .addCase(fetchMyInvites.rejected, handleRejected)
      .addCase(acceptInvite.pending, handlePending)
      .addCase(acceptInvite.fulfilled, handleAcceptInviteFulfilled)
      .addCase(acceptInvite.rejected, handleRejected)
      .addCase(deleteMember.pending, handlePending)
      .addCase(deleteMember.fulfilled, handleDeleteMemberFulfilled)
      .addCase(deleteMember.rejected, handleRejected)
});

export const actionsReducer = actionsSlice.reducer;
