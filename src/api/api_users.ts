import {AxiosResponse} from 'axios';
import {PasswordUpdateBackType, UsernameUpdateType} from '../types/authTypes';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";

export const getUsers = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.users.all(skip, limit));
};

export const getUserById = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.users.byId(id));
};

export const editUserUsername = async (userData: UsernameUpdateType): Promise<AxiosResponse> => {
  const {id} = userData;
  return await axiosInstance.patch(mainUrls.users.byId(id), userData);
};

export const editUserPassword = async (userData: PasswordUpdateBackType): Promise<AxiosResponse> => {
  const {id} = userData;
  return await axiosInstance.patch(mainUrls.users.byId(id), userData);
};

export const removeUser = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.users.byId(id));
};
