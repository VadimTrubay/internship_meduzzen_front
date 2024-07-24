import axios, {AxiosResponse} from "axios";
import {baseURL} from "../utils/process_base_url";
import {RegisterType, UserAuthorizationType} from "../types/authTypes";
import {get_access_token_from_state} from "../utils/get_access_token_from_state";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import {mainUrls} from "../config/urls";


axios.defaults.baseURL = baseURL;

export const register = async (credentials: RegisterType): Promise<AxiosResponse> => {
  return await axios.post(mainUrls.auth.signup, credentials);
};

export const login = async (credentials: UserAuthorizationType): Promise<AxiosResponse> => {
  return await axios.post(mainUrls.auth.login, credentials);
};

export const me = async (thunkAPI: GetThunkAPI<AsyncThunkConfig>): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.get(mainUrls.auth.me, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};