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
// export const getUserPost = async () => {
//     try {
//         const response = await axiosInstance.get('/api/post/getUserPost');
//         return response.data;
//     } catch (error) {
//         return error.message;
//     }
// }

//get another user Porifle
// export const getAnotherUserPost = async () => {
//     try {
//         const response = await axiosInstance.get('/api/post/getAnotherUserPost');
//         console.log(response);
//         return response.data;
//     } catch (error) {
//         return error.message;
//     }
// }