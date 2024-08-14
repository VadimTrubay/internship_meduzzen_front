import {AxiosResponse} from 'axios';
import {PasswordUpdateBackType, UsernameUpdateType} from '../types/authTypes';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";

export const getUsersApi = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.users.all(skip, limit));
};

export const getUserByIdApi = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.users.byId(id));
};

export const editUserUsernameApi = async (userData: UsernameUpdateType): Promise<AxiosResponse> => {
  const {id} = userData;
  return await axiosInstance.patch(mainUrls.users.byId(id), userData);
};

export const editUserPasswordApi = async (userData: PasswordUpdateBackType): Promise<AxiosResponse> => {
  const {id} = userData;
  return await axiosInstance.patch(mainUrls.users.byId(id), userData);
};

export const removeUserApi = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.users.byId(id));
};
