import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import authSliceReducer from './authSlice';
import cartSliceReducer from './cartSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        cart: cartSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
