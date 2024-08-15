import axios, {AxiosResponse} from "axios";
import {HealthCheckTypes} from "../types/healthCheckTypes";
import {baseURL} from "../utils/processBaseUrl"
import {mainUrls} from "../config/urls";


axios.defaults.baseURL = baseURL;

export const getHealthCheckApi = async (): Promise<AxiosResponse<HealthCheckTypes>> => {
  return await axios.get(mainUrls.healthcheck);
};
