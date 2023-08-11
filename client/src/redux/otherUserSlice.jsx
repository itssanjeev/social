import { createSlice } from "@reduxjs/toolkit";
export const otherUserSlice = createSlice({
    name: 'otherUser',
    initialState: {
        otherUser: null,
    },
    reducers: {
        setOtherUser: (state, action) => {
            state.otherUser = action.payload;
            // console.log(action.payload);
        }
    }
})
export const { setOtherUser } = otherUserSlice.actions;