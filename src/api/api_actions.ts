import {AxiosResponse} from "axios";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {mainUrls} from "../config/urls";
import {sendInviteType} from "../types/actionsTypes";


export const getMembers = async (companyId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.get(mainUrls.actions.membersCompany(companyId))
};

export const getMyInvites = async (thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.get(mainUrls.actions.myInvites)
};

export const getMyRequests = async (thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.get(mainUrls.actions.myRequests)
};

export const removeMember = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.delete(mainUrls.actions.kick(actionId));
};

export const sendInvite = async (sendInviteData: sendInviteType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.sendInvite, sendInviteData);
};

export const acceptInviteApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.acceptInvite(actionId));
};

export const declineInviteApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.declineInvite(actionId));
};