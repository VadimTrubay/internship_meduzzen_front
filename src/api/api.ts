import axios, {AxiosResponse} from "axios";
import {HealthCheckTypes} from "../types/healthCheckTypes";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export const getHealthCheck = async (): Promise<AxiosResponse<HealthCheckTypes>> => {
  return await axios.get("/healthcheck");
};
