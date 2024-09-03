import { axiosInstances } from "./apiInstance";

export const sentMessage = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/message/SentMessage', payload);
        // console.log(response);
        return response.data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const getAllUserMessage = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/message/getMessagesOfUser', payload);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const messageUserList = async () => {
    try {
        const response = await axiosInstances.get('/api/message/getMessageUserList');
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const createNewMessage = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/message/CreateNewChat', payload);
        return response.data;
    } catch (error) {
        return error;
    }
}
