import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  getMembers, removeMember, sendInvite, getMyInvites, getMyRequests,
  acceptInviteApi, declineInviteApi, getCompanyInvites, getCompanyRequests,
  deleteInviteApi, sendRequest, deleteRequestApi, leaveFromCompanyApi,
  acceptRequestApi, declineRequestApi, addAdminRoleApi, removeAdminRole, getAdmins
} from "../../api/api_actions";
import {changeRoleType, sendInviteType, sendRequestType} from "../../types/actionsTypes";


export const fetchMembers = createAsyncThunk(
  "actions/fetchMembers",
  async (companyId: string, thunkAPI) => {
    try {
      const response = await getMembers(companyId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchAdmins = createAsyncThunk(
  "actions/fetchAdmins",
  async (companyId: string, thunkAPI) => {
    try {
      const response = await getAdmins(companyId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchMyInvites = createAsyncThunk(
  "actions/fetchMyInvites",
  async (_, thunkAPI) => {
    try {
      const response = await getMyInvites(thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchMyRequests = createAsyncThunk(
  "actions/fetchMyRequests",
  async (_, thunkAPI) => {
    try {
      const response = await getMyRequests(thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchCompanyInvites = createAsyncThunk(
  "actions/fetchCompanyInvites",
  async (companyId: string, thunkAPI) => {
    try {
      const response = await getCompanyInvites(companyId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const fetchCompanyRequests = createAsyncThunk(
  "actions/fetchCompanyRequests",
  async (companyId: string, thunkAPI) => {
    try {
      const response = await getCompanyRequests(companyId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const createInvite = createAsyncThunk(
  "actions/createInvite",
  async (sendInviteData: sendInviteType, thunkAPI) => {
    try {
      const response = await sendInvite(sendInviteData, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const deleteInvite = createAsyncThunk(
  "actions/deleteInvite",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await deleteInviteApi(actionId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const acceptInvite = createAsyncThunk(
  "actions/acceptInvite",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await acceptInviteApi(actionId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const declineInvite = createAsyncThunk(
  "actions/declineInvite",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await declineInviteApi(actionId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const createRequest = createAsyncThunk(
  "actions/createRequest",
  async (sendRequestData: sendRequestType, thunkAPI) => {
    try {
      const response = await sendRequest(sendRequestData, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "actions/deleteRequest",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await deleteRequestApi(actionId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);


export const acceptRequest = createAsyncThunk(
  "actions/acceptRequest",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await acceptRequestApi(actionId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const declineRequest = createAsyncThunk(
  "actions/declineRequest",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await declineRequestApi(actionId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const leaveFromCompany = createAsyncThunk(
  "actions/leaveFromCompany",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await leaveFromCompanyApi(actionId, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const deleteMember = createAsyncThunk(
  "actions/deleteMember",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await removeMember(actionId, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const addAdminRole = createAsyncThunk(
  "actions/addAdminRole",
  async (sendInviteData: changeRoleType, thunkAPI) => {
    try {
      const response = await addAdminRoleApi(sendInviteData, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const deleteAdminRole = createAsyncThunk(
  "actions/deleteAdminRole",
  async (sendInviteData: changeRoleType, thunkAPI) => {
    try {
      const response = await removeAdminRole(sendInviteData, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);