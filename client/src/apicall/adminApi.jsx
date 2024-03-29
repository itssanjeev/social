import { axiosInstances } from "./apiInstance";

export const approvePostApi = async (payload) => {
    try {
        // console.log(payload);
        const response = await axiosInstances.post("/api/admin/approve", payload);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const blockPostApi = async (payload) => {
    try {
        const response = await axiosInstances.post("/api/admin/block", payload);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const getPostAdminApi = async (payload) => {
    try {
        const response = await axiosInstances.get("/api/admin/getAllPostAdmin", payload);
        return response.data;
    } catch (error) {
        return error;
    }
}