import {AxiosResponse} from "axios";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {mainUrls} from "../config/urls";
import {sendInviteType, sendRequestType} from "../types/actionsTypes";


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

export const getCompanyInvites = async (companyId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.get(mainUrls.actions.companyInvites(companyId))
};

export const getCompanyRequests = async (companyId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.get(mainUrls.actions.companyRequests(companyId))
};

export const sendInvite = async (sendInviteData: sendInviteType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.sendInvite, sendInviteData);
};

export const deleteInviteApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.delete(mainUrls.actions.deleteInvite(actionId));
};

export const sendRequest = async (sendRequestData: sendRequestType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.sendRequest, sendRequestData);
};

export const deleteRequestApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.delete(mainUrls.actions.deleteRequest(actionId));
};

export const acceptInviteApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.acceptInvite(actionId));
};

export const declineInviteApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.declineInvite(actionId));
};

export const acceptRequestApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.acceptRequest(actionId));
};

export const declineRequestApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.post(mainUrls.actions.declineRequest(actionId));
};

export const removeMember = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.delete(mainUrls.actions.kick(actionId));
};

export const leaveFromCompanyApi = async (actionId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.delete(mainUrls.actions.leave(actionId));
};
