import axios, {AxiosResponse} from "axios";
import {HealthCheckTypes} from "../types/healthCheckTypes";
import {baseURL} from "../utils/process_base_url"


axios.defaults.baseURL = baseURL;

export const getHealthCheck = async (): Promise<AxiosResponse<HealthCheckTypes>> => {
  return await axios.get("/healthcheck");
};
