import { configureStore } from '@reduxjs/toolkit';

import loaderSlice from './loaderSlice';
import { userSlice } from './userSlice';

const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        loaders: loaderSlice.reducer,
    }
})
export default store;
