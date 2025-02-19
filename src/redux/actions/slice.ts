import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialActionsType, memberType} from "../../types/actionsTypes";
import {
  acceptInvite, createInvite, deleteInvite, deleteMember,
  fetchMembers, deleteRequest, createRequest, declineInvite,
  fetchMyInvites, fetchMyRequests, leaveFromCompany,
  fetchCompanyInvites, fetchCompanyRequests, acceptRequest,
  declineRequest, addAdminRole, deleteAdminRole, fetchAdmins
} from "./operations";
import toast from "react-hot-toast";


const initialActions: initialActionsType = {
  members: [],
  admins: [],
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
  toast.error(action.payload);

};

const handleSendInviteFulfilled = (
  state: initialActionsType,
) => {
  state.loading = false;
  state.error = null;
  toast.success(`Invite created successfully`);
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

const handleSendRequestFulfilled = (
  state: initialActionsType,
) => {
  state.loading = false;
  state.error = null;
  toast.success(`Request send successfully`);
};

const handleDeleteRequestFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.companyRequests = state.companyRequests.filter((request) => request.id !== action.payload.id);
  toast.success(`Request deleted successfully`);
};

const handleFetchMembersFulfilled = (
  state: initialActionsType,
  action: PayloadAction<memberType[]>
) => {
  state.loading = false;
  state.error = null;
  state.members = action.payload;
};


const handleFetchAdminsFulfilled = (
  state: initialActionsType,
  action: PayloadAction<memberType[]>
) => {
  state.loading = false;
  state.error = null;
  state.admins = action.payload;
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
  action: PayloadAction<any>
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
  action: PayloadAction<any>
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
  state.companyRequests = state.companyRequests.filter((invite) => invite.id !== action.payload.id);
  toast.success(`Invite declined successfully`);
};

const handleAcceptRequestFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.companyRequests = state.companyRequests.filter((request) => request.id !== action.payload.id);
  toast.success(`Request accepted successfully`);
};

const handleDeclineRequestFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.myRequests = state.myRequests.filter((request) => request.id !== action.payload.id);
  toast.success(`Request declined successfully`);
};

const handleDeleteMemberFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.members = state.members.filter((member) => member.id !== action.payload.id);
  toast.success(`Member deleted successfully`);
};

const handleLeaveFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.members = state.members.filter((member) => member.id !== action.payload.id);
  toast.success(`Leave from company successfully`);
};

const handleAddAdminRoleFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.members = state.members.map((member) => {
      if (member.id == action.payload.id) {
        return {...member, role: action.payload.role};
      }
      return member;
    }
  );
  toast.success(`Change role successfully`);
};

const handleDeleteAdminRoleFulfilled = (
  state: initialActionsType,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = null;
  state.members = state.members.map((member) => {
      if (member.id == action.payload.id) {
        return {...member, role: action.payload.role};
      }
      return member;
    }
  );
  toast.success(`Change role successfully`);
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
      .addCase(createRequest.pending, handlePending)
      .addCase(createRequest.fulfilled, handleSendRequestFulfilled)
      .addCase(createRequest.rejected, handleRejected)
      .addCase(deleteRequest.pending, handlePending)
      .addCase(deleteRequest.fulfilled, handleDeleteRequestFulfilled)
      .addCase(deleteRequest.rejected, handleRejected)
      .addCase(fetchMembers.pending, handlePending)
      .addCase(fetchMembers.fulfilled, handleFetchMembersFulfilled)
      .addCase(fetchMembers.rejected, handleRejected)
      .addCase(fetchAdmins.pending, handlePending)
      .addCase(fetchAdmins.fulfilled, handleFetchAdminsFulfilled)
      .addCase(fetchAdmins.rejected, handleRejected)
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
      .addCase(acceptRequest.pending, handlePending)
      .addCase(acceptRequest.fulfilled, handleAcceptRequestFulfilled)
      .addCase(acceptRequest.rejected, handleRejected)
      .addCase(declineRequest.pending, handlePending)
      .addCase(declineRequest.fulfilled, handleDeclineRequestFulfilled)
      .addCase(declineRequest.rejected, handleRejected)
      .addCase(deleteMember.pending, handlePending)
      .addCase(deleteMember.fulfilled, handleDeleteMemberFulfilled)
      .addCase(deleteMember.rejected, handleRejected)
      .addCase(leaveFromCompany.pending, handlePending)
      .addCase(leaveFromCompany.fulfilled, handleLeaveFulfilled)
      .addCase(leaveFromCompany.rejected, handleRejected)
      .addCase(addAdminRole.pending, handlePending)
      .addCase(addAdminRole.fulfilled, handleAddAdminRoleFulfilled)
      .addCase(addAdminRole.rejected, handleRejected)
      .addCase(deleteAdminRole.pending, handlePending)
      .addCase(deleteAdminRole.fulfilled, handleDeleteAdminRoleFulfilled)
      .addCase(deleteAdminRole.rejected, handleRejected)
});

export const actionsReducer = actionsSlice.reducer;
