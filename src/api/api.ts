import axios, {AxiosResponse} from "axios";
import {HealthCheckTypes} from "../types/healthCheckTypes";
import {baseURL} from "../utils/process_base_url"
import {UsernameUpdateType, UserType} from "../types/usersTypes";


axios.defaults.baseURL = baseURL;

export const getHealthCheck = async (): Promise<AxiosResponse<HealthCheckTypes>> => {
  return await axios.get("/healthcheck");
};

export const getUsers = async (skip: number, limit: number): Promise<AxiosResponse<UserType[]>> => {
  return await axios.get(`/users?skip=${skip}&limit=${limit}`);
};

export const getUserById = async (userId: string): Promise<AxiosResponse<HealthCheckTypes>> => {
  return await axios.get(`/users/${userId}`);
};

export const editUsername = async ({userId, username}: UsernameUpdateType): Promise<AxiosResponse<UsernameUpdateType>> => {
  return await axios.patch(`/users/${userId}`, {username});
};

export const removeUserById = async (userId: string): Promise<AxiosResponse<HealthCheckTypes>> => {
  return await axios.delete(`/users/${userId}`);
};