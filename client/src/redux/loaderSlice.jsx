import { createSlice } from "@reduxjs/toolkit";
const loaderSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading: false,
    },
    reducers: {
        setLoader: (state, action) => {   //here state is the initialState which had been decleared above 
            state.loading = action.payload
        }
    }
})
export const { setLoader } = loaderSlice.actions;
export default loaderSlice;