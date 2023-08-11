import { axiosInstances } from "./apiInstance";
export const getOtherUserPost = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/posts/getOtherUserPost', payload);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message
    }
}