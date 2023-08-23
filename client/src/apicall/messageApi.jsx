import { axiosInstances } from "./apiInstance";

export const sentMessage = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/message/sentMessage', payload);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getAllMessage = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/message/getMessage', payload);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const messageUserList = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/message/messageUserList', payload);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}