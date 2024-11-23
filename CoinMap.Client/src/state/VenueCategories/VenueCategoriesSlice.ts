import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VenueCategory } from "../../types/VenueCategory";
import { GetRequest } from "../../api/cruds";
import { Venue } from "../../types/Venue";

interface VenueCategoriesState {
    categories:  VenueCategory[],
    activeCategory: VenueCategory | null
}

const initialState: VenueCategoriesState = {
    categories: [],
    activeCategory: null
}

export const venueCategoriesSlice = createSlice({
    name: "venueCategories",
    initialState: initialState,
    reducers: {
        setActiveCatregory: (state, action) => {
            state.activeCategory = action.payload;
        },
        resetActiveCategory: (state) => {
            return {
                ...state,
                activeCategory: null
            };
        }
    },
    extraReducers(builder)  {
        builder.addCase(getVenueCategoriesAsync.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
});

export const getVenueCategoriesAsync = createAsyncThunk("venueCategories/getVenueCategoriesAsync",
    async () => {
        const res = await GetRequest<VenueCategory[]>('/venues/categories');
        return res;
    }
);

export const getVenuesByCategoryAsync = createAsyncThunk("venueCategories/getVenuesByCategoryAsync", 
    async (params: {}) => {
        const res = await GetRequest<Venue[]>("/venues", params);
        return res;
    }
)

export const { setActiveCatregory, resetActiveCategory } = venueCategoriesSlice.actions;
export default venueCategoriesSlice.reducer;