import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
export const userMessage = createSlice({
    name: 'userMessage',
    initialState: [],
    reducers: {
        setUserMessage: (state, action) => {
            state.userMessage.push(action.payload);
        }
    }
})
export const { setUserMessage } = userSlice.actions;