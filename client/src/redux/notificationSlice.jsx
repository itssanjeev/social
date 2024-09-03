import { createSlice } from '@reduxjs/toolkit';
import { fetchNotifications, readNotifications } from './redux-thunk/notificationReduxThunk';



const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        list: [],
    },
    reducers: {
        addNotification: (state, action) => {
            state.list.unshift(action.payload);
        },
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
                state.error = action.payload; // Handle error
            })
    },
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
