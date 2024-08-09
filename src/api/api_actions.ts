import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import {changeRoleType, sendInviteType, sendRequestType} from '../types/actionsTypes';
import axiosInstance from "../utils/createAxiosInstance";

export const getMembersApi = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.membersCompany(companyId));
};

export const getAdminsApi = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.adminsCompany(companyId));
};

export const getMyInvitesApi = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.myInvites);
};

export const getMyRequestsApi = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.myRequests);
};

export const getCompanyInvitesApi = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.companyInvites(companyId));
};

export const getCompanyRequestsApi = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.companyRequests(companyId));
};

export const sendInviteApi = async (sendInviteData: sendInviteType): Promise<AxiosResponse> => {
  const {companyId, userId} = sendInviteData;
  return await axiosInstance.post(mainUrls.actions.sendInvite(companyId, userId));
};

export const deleteInviteApi = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.actions.deleteInvite(actionId));
};

export const acceptInviteApi = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.actions.acceptInvite(actionId));
};

export const declineInviteApi = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.actions.declineInvite(actionId));
};


export const sendRequestApi = async (sendRequestData: sendRequestType): Promise<AxiosResponse> => {
  const {companyId, userId} = sendRequestData;
  return await axiosInstance.post(mainUrls.actions.sendRequest(companyId, userId));
};

export const deleteRequestApi = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.actions.deleteRequest(actionId));
};

export const acceptRequestApi = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.actions.acceptRequest(actionId));
};

export const declineRequestApi = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.actions.declineRequest(actionId));
};

export const leaveFromCompanyApi = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.actions.leave(actionId));
};

export const removeMemberApi = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.actions.kick(actionId));
};

export const addAdminRoleApi = async (sendInviteData: changeRoleType): Promise<AxiosResponse> => {
  const {companyId, userId} = sendInviteData;
  return await axiosInstance.patch(mainUrls.actions.addAdminRole(companyId, userId));
};

export const removeAdminRoleApi = async (sendInviteData: changeRoleType): Promise<AxiosResponse> => {
  const {companyId, userId} = sendInviteData;
  return await axiosInstance.patch(mainUrls.actions.removeAdminRole(companyId, userId));
};
