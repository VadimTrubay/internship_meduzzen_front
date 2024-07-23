import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios, {AxiosResponse} from "axios";
import {get_access_token_from_state} from "../utils/get_access_token_from_state";
import {PasswordUpdateBackType, UsernameUpdateType} from "../types/authTypes";
import {mainUrls} from "../config/urls";


export const getUsers = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axios.get(mainUrls.users.all(skip, limit));
};

export const getUserById = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(mainUrls.users.byId(id));
};

export const editUserUsername = async (userData: UsernameUpdateType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);
  const {id} = userData;
  return await axios.patch(mainUrls.users.byId(id), userData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const editUserPassword = async (userData: PasswordUpdateBackType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);
  const {id} = userData;
  return await axios.patch(mainUrls.users.byId(id), userData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const removeUser = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.delete(mainUrls.users.byId(id), {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
