import {createAsyncThunk} from "@reduxjs/toolkit";
import {getMembers, removeMember, sendInvite, getMyInvites, acceptInviteApi} from "../../api/api_actions";
import {sendInviteType} from "../../types/actionsTypes";


export const fetchMembers = createAsyncThunk(
  "actions/fetchMembers",
  async (companyId: string, thunkAPI) => {
    try {
      const response = await getMembers(companyId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//
// export const updateCompany = createAsyncThunk(
//   "actions/updateCompany",
//   async (companyData: CompanyUpdateType, thunkAPI) => {
//     try {
//       const response = await editCompany(companyData, thunkAPI)
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const deleteMember = createAsyncThunk(
  "actions/deleteMember",
  async (actionId: string, thunkAPI) => {
    try {
      const response = await removeMember(actionId, thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
