import axios from "axios";
import {baseURL} from "./process_base_url";

const URL = axios.defaults.baseURL = baseURL;


export const getAccessTokenFromState = (thunkAPI) => {
  const state = thunkAPI.getState();
  const access_token = state.auth.access_token;
  if (access_token === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  return access_token;
}

export const createAxiosInstance = (thunkAPI) => {
  const accessToken = getAccessTokenFromState(thunkAPI);

  return axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};