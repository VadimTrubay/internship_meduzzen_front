import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";


export const getMyNotificationsApi = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.notifications.all);
};

export const markAsReadNotificationsApi = async (notificationId: string): Promise<AxiosResponse> => {
  return await axiosInstance.patch(mainUrls.notifications.markAsRead(notificationId));
};