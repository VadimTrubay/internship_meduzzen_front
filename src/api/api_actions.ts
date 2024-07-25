import {AxiosResponse} from "axios";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {mainUrls} from "../config/urls";


export const getMembers = async (companyId: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);
  return await axiosInstance.get(mainUrls.actions.members(companyId))
};
