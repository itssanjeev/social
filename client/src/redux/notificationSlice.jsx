import { createSlice } from '@reduxjs/toolkit';
import { fetchNotifications, countNotifications, markNotificatonsRead, messageCountNotifications, readMessageNotifications } from './redux-thunk/notificationReduxThunk';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        list: [],
        notificationCount: 0,
        notificationMessageCount: 0,
    },
    reducers: {
        addNotification: (state, action) => {
            state.list.unshift(action.payload);
            state.notificationCount += 1;
        },
        countNotification: (state, action) => {
            state.notificationCount(action.payload);
        },
        markNotificationAsRead: (state, action) => {
            state.notificationCount(action.payload);
        },
        countMessageNotification: (state, action) => {
            state.notificationMessageCount(action.payload);
        },
        markMessageNotification: (state, action) => {
            state.notificationMessageCount(action.payload);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.list = action.payload; // Set the fetched notifications to the initial state
                state.loading = false;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(countNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(countNotifications.fulfilled, (state, action) => {
                state.notificationCount = action.payload; // Set the fetched notifications to the initial state
                state.loading = false;
            })
            .addCase(countNotifications.rejected, (state, action) => {
                state.loading = false;
                state.notificationMessageCount = action.payload;
            })

            .addCase(markNotificatonsRead.fulfilled, (state, action) => {
                state.notificationCount = action.payload;
                state.loading = false;
            })

            .addCase(messageCountNotifications.fulfilled, (state, action) => {
                state.notificationMessageCount = action.payload;
                state.loading = false;
            })

            .addCase(readMessageNotifications.fulfilled, (state, action) => {
                state.notificationMessageCount = action.payload;
                state.loading = false;
            })
    },
});

export const { addNotification, countNotification, markNotificationAsRead, countMessageNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
