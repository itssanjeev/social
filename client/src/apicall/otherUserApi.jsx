import { axiosInstances } from "./apiInstance";

export const getOtherUser = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/users/getOtherUser', payload);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

