import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loaderSlice from './loaderSlice';
import { userSlice } from './userSlice';

const userPersistConfig = {
    key: 'user',
    storage,
};

const rootReducer = {
    users: persistReducer(userPersistConfig, userSlice.reducer),
    loaders: loaderSlice.reducer,
};

const store = configureStore({
    reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
