import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {initialActionsType, memberType} from "../../types/actionsTypes";
import {
  acceptInvite,
  createInvite,
  declineInvite, deleteInvite,
  deleteMember, fetchCompanyInvites, fetchCompanyRequests,
  fetchMembers,
  fetchMyInvites,
  fetchMyRequests
} from "./operations";


const initialActions: initialActionsType = {
  members: [],
  myInvites: [],
  myRequests: [],
  companyInvites: [],
  companyRequests: [],
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
};

const handleSendInviteFulfilled = (
  state: initialActionsType,
) => {
  state.loading = false;
  state.error = null;
  toast.success(`Invite sent successfully`);
};

const handleDeleteInviteFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.companyInvites = state.myInvites.filter((invite) => invite.id !== action.payload.id);
  toast.success(`Invite deleted successfully`);
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

const handleFetchMyRequestsFulfilled = (
  state: initialActionsType,
  action: PayloadAction<memberType[]>
) => {
  state.loading = false;
  state.error = null;
  state.myRequests = action.payload;
};

const handleFetchCompanyInvitesFulfilled = (
  state: initialActionsType,
  action: PayloadAction<memberType[]>
) => {
  state.loading = false;
  state.error = null;
  state.companyInvites = action.payload;
};

const handleFetchCompanyRequestsFulfilled = (
  state: initialActionsType,
  action: PayloadAction<memberType[]>
) => {
  state.loading = false;
  state.error = null;
  state.companyRequests = action.payload;
};

const handleAcceptInviteFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.myInvites = state.myInvites.filter((invite) => invite.id !== action.payload.id);
  toast.success(`Invite accepted successfully`);
};

const handleDeclineInviteFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.myInvites = state.myInvites.filter((invite) => invite.id !== action.payload.id);
  toast.error(`Invite decline successfully`);
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
      .addCase(createInvite.pending, handlePending)
      .addCase(createInvite.fulfilled, handleSendInviteFulfilled)
      .addCase(createInvite.rejected, handleRejected)
      .addCase(deleteInvite.pending, handlePending)
      .addCase(deleteInvite.fulfilled, handleDeleteInviteFulfilled)
      .addCase(deleteInvite.rejected, handleRejected)
      .addCase(fetchMembers.pending, handlePending)
      .addCase(fetchMembers.fulfilled, handleFetchMembersFulfilled)
      .addCase(fetchMembers.rejected, handleRejected)
      .addCase(fetchMyInvites.pending, handlePending)
      .addCase(fetchMyInvites.fulfilled, handleFetchMyInvitesFulfilled)
      .addCase(fetchMyInvites.rejected, handleRejected)
      .addCase(fetchMyRequests.pending, handlePending)
      .addCase(fetchMyRequests.fulfilled, handleFetchMyRequestsFulfilled)
      .addCase(fetchMyRequests.rejected, handleRejected)
      .addCase(fetchCompanyInvites.pending, handlePending)
      .addCase(fetchCompanyInvites.fulfilled, handleFetchCompanyInvitesFulfilled)
      .addCase(fetchCompanyInvites.rejected, handleRejected)
      .addCase(fetchCompanyRequests.pending, handlePending)
      .addCase(fetchCompanyRequests.fulfilled, handleFetchCompanyRequestsFulfilled)
      .addCase(fetchCompanyRequests.rejected, handleRejected)
      .addCase(acceptInvite.pending, handlePending)
      .addCase(acceptInvite.fulfilled, handleAcceptInviteFulfilled)
      .addCase(acceptInvite.rejected, handleRejected)
      .addCase(declineInvite.pending, handlePending)
      .addCase(declineInvite.fulfilled, handleDeclineInviteFulfilled)
      .addCase(declineInvite.rejected, handleRejected)
      .addCase(deleteMember.pending, handlePending)
      .addCase(deleteMember.fulfilled, handleDeleteMemberFulfilled)
      .addCase(deleteMember.rejected, handleRejected)
});

export const actionsReducer = actionsSlice.reducer;
