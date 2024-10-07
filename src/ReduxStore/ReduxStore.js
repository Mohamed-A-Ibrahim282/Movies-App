import { configureStore } from "@reduxjs/toolkit";
import { ReviewsReducer } from './ReviewsSlice';



export const myStore = configureStore({
    reducer: {
        ReviewsReducer,
    }
})