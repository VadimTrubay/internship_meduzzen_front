import axios, {AxiosResponse} from "axios";
import {HealthCheckTypes} from "../types/healthCheckTypes";
import {baseURL} from "../utils/process_base_url"
import {mainUrls} from "../config/urls";


axios.defaults.baseURL = baseURL;

export const getHealthCheck = async (): Promise<AxiosResponse<HealthCheckTypes>> => {
  return await axios.get(mainUrls.healthcheck);
};
