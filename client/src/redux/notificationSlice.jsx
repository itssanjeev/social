import { createSlice } from "@reduxjs/toolkit";
export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: null,
    },
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
            // console.log(action,'redux notitication 10');
        }
    }
})
export const { setNotification } = notificationSlice.actions;