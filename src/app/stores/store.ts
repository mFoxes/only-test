import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../../pages/home/slices/homeSlice';

export const store = configureStore({
    reducer: {
        home: homeReducer
    }
});
