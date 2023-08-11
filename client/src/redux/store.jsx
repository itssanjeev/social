import { configureStore } from '@reduxjs/toolkit';

import loaderSlice from './loaderSlice';
import { userSlice } from './userSlice';
import { otherUserSlice } from './otherUserSlice';

const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        loaders: loaderSlice.reducer,
        otherUsers: otherUserSlice.reducer,
    }
})
export default store;
