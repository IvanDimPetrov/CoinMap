import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VenueCategory } from "../../types/VenueCategory";
import { GetRequest } from "../../api/cruds";

interface VenueCategoriesState {
    categories:  VenueCategory[]
}

const initialState: VenueCategoriesState = {
    categories: []
}

export const venueCategoriesSlice = createSlice({
    name: "venueCategories",
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder)  {
        builder.addCase(getVenueCategoriesAsync.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
});

export const getVenueCategoriesAsync = createAsyncThunk("venueCategories",
    async () => {
        const res = await GetRequest<VenueCategory[]>('/venue/categories');

        return res;
    }
)

export default venueCategoriesSlice.reducer;