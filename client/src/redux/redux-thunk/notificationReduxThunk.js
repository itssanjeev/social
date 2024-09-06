import { createAsyncThunk } from '@reduxjs/toolkit';
import { countMessageNotificationApi, getNotificationApi, notificationCountApi, readNotificationApi, readMessageNotificationApi } from '../../apicall/notificationApi';

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

export const countNotifications = createAsyncThunk(
    'notifications/readNotifications',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await notificationCountApi(payload);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const markNotificatonsRead = createAsyncThunk(
    'notifications/markRead',
    async (payload, { rejectWithValue }) => {
        try {
            await readNotificationApi(payload);
            return 0;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const messageCountNotifications = createAsyncThunk(
    'notifications/fetchCountNotification',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await countMessageNotificationApi(payload);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const readMessageNotifications = createAsyncThunk(
    'notifications/readMessageNotificatons',
    async (payload, { rejectWithValue }) => {
        try {
            await readMessageNotificationApi();
            return 0;
        } catch (error) {

        }
    }
)