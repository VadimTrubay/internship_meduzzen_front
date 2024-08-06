import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import {changeRoleType, sendInviteType, sendRequestType} from '../types/actionsTypes';
import axiosInstance from "../utils/createAxiosInstance";

export const getMembers = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.membersCompany(companyId));
};

export const getAdmins = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.adminsCompany(companyId));
};

export const getMyInvites = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.myInvites);
};

export const getMyRequests = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.myRequests);
};

export const getCompanyInvites = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.companyInvites(companyId));
};

export const getCompanyRequests = async (companyId: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.actions.companyRequests(companyId));
};

export const sendInvite = async (sendInviteData: sendInviteType): Promise<AxiosResponse> => {
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

export const removeMember = async (actionId: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.actions.kick(actionId));
};

export const addAdminRoleApi = async (sendInviteData: changeRoleType): Promise<AxiosResponse> => {
  const {companyId, userId} = sendInviteData;
  return await axiosInstance.patch(mainUrls.actions.addAdminRole(companyId, userId));
};

export const removeAdminRole = async (sendInviteData: changeRoleType): Promise<AxiosResponse> => {
  const {companyId, userId} = sendInviteData;
  return await axiosInstance.patch(mainUrls.actions.removeAdminRole(companyId, userId));
};
