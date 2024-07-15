import axios, {AxiosResponse} from "axios";
import {HealthCheckTypes} from "../types/healthCheckTypes";
import {baseURL} from "../utils/process_base_url"
import {UserType} from "../types/usersTypes";


axios.defaults.baseURL = baseURL;

export const getHealthCheck = async (): Promise<AxiosResponse<HealthCheckTypes>> => {
  return await axios.get("/healthcheck");
};

export const getUsers = async (skip: number, limit: number): Promise<AxiosResponse<UserType[]>> => {
  return await axios.get(`/users?skip=${skip}&limit=${limit}`);
};