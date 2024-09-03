import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNotificationApi, readNotificationApi } from '../../apicall/notificationApi';
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await getNotificationApi(payload);
            return data.data; // This data will be passed to the fulfilled reducer
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const readNotifications = createAsyncThunk(
    'notifications/readNotifications',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await readNotificationApi(payload);
            return data; // This data will be passed to the fulfilled reducer
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)