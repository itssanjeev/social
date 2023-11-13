import { axiosInstances } from "./apiInstance";
//user registration 
export const registerUser = async (payload) => {
    try {
        // console.log(payload);
        const response = await axiosInstances.post('/api/users/register', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//user login 
export const loginUser = async (payload) => {
    try {
        // console.log(payload);
        const response = await axiosInstances.post('/api/users/login', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//get current user 
export const getCurrentUser = async () => {
    try {
        const response = await axiosInstances.get('/api/users/get-current-user');
        // console.log(response.data), 'current user api 28';
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//edit user profile
export const updateUserProfile = async (payload) => {
    try {
        const response = await axiosInstances.post('/api/users/edit-user-profile', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//this api is called to follow other user 
export const followUser = async (payload) => {
    try {
        console.log(payload);
        const response = await axiosInstances.post('/api/users/followUser', payload);
        console.log(response);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


//to get followers of the user 
export const followersApi = async (payload) => {
    try {
        // console.log(payload);
        const response = await axiosInstances.post('/api/users/getFollowers', payload);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


//to get following of the user 
export const followingApi = async (payload) => {
    try {
        // console.log(payload);
        const response = await axiosInstances.post('/api/users/getFollowing', payload);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//search user 
export const searchUser = async (payload) => {
    try {
        console.log(payload);
        const response = await axiosInstances.post('/api/users/searchUser', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}