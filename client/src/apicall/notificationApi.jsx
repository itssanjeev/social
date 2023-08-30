import { axiosInstances } from "./apiInstance";

export const getNotificationApi = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/notification/getAllNotification', payload);
        // console.log(response.data);
        return response.data;
        // console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

export const readNotificationApi = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/notification/markNotificationAsRead', payload);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}