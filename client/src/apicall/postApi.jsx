import { axiosInstances } from "./apiInstance";

//upload post 
export const uploadPost = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/posts/addNewPost', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// get all post at once
export const getAllPost = async () => {
    try {
        const response = await axiosInstances.get('/api/posts/getAllPost');
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//get the user Post
export const getUserPost = async () => {
    try {
        const response = await axiosInstances.get('/api/posts/getUserPost');
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//to get the likes number of people do
export const postLike = async (payload) => {
    try {
        // console.log(payload);
        const response = await axiosInstances.post('./api/posts/likes', payload);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}