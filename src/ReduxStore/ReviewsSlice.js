import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const allReviews = createAsyncThunk("Reviews/getAllReviews", async function (movieId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWJmM2E4NWYyNDhlY2ExMTNiYmRlYWNkODkzYWQ2NiIsIm5iZiI6MTcyNDQ4NjI3Ny42NDA5NzUsInN1YiI6IjY1OGNhNTc0MWJmODc2MDQ4MDZlNzlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2a3JiBBjZDUQXP4FlPhwWvF-GbaauUr8_dF6JGPmvM",
            },
        });

        return response.data
    } catch (error) {
        console.log("error", error);
    }
})

export const allTvShowsReviews = createAsyncThunk("Reviews/allTvShowsReviews", async function (tvId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvId}/reviews`, {
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWJmM2E4NWYyNDhlY2ExMTNiYmRlYWNkODkzYWQ2NiIsIm5iZiI6MTcyNDQ4NjI3Ny42NDA5NzUsInN1YiI6IjY1OGNhNTc0MWJmODc2MDQ4MDZlNzlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2a3JiBBjZDUQXP4FlPhwWvF-GbaauUr8_dF6JGPmvM",
            },
        });

        return response.data
    } catch (error) {
        console.log("error", error);
    }
})

const ReviewsSlice = createSlice({
    name: "Reviews",
    initialState: {
        reviewsData: [],
        reviewsLoading: false
    },
    extraReducers: function (builder) {
        builder.addCase(allReviews.fulfilled, function (state, action) {
            if (state.reviewsData !== action.payload?.results) {
                state.reviewsData = action.payload?.results;
                state.reviewsLoading = false
            }
        })
        builder.addCase(allReviews.pending, function (state, action) {
            state.reviewsData = null
            state.reviewsLoading = true
        })
        builder.addCase(allReviews.rejected, function (state, action) {
            state.reviewsData = null
            state.reviewsLoading = false
        })

        /***********************************************************************************************/
        builder.addCase(allTvShowsReviews.fulfilled, function (state, action) {
            if (state.reviewsData !== action.payload?.results) {
                state.reviewsData = action.payload?.results;
                state.reviewsLoading = false
            }
        })
        builder.addCase(allTvShowsReviews.pending, function (state, action) {
            state.reviewsData = null
            state.reviewsLoading = true
        })
        builder.addCase(allTvShowsReviews.rejected, function (state, action) {
            state.reviewsData = null
            state.reviewsLoading = false
        })
    }
})


export const ReviewsReducer = ReviewsSlice.reducer