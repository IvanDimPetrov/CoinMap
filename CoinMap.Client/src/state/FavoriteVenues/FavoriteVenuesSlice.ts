import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Venue } from "../../types/Venue";
import { PostReguest } from "../../api/cruds";

interface FavoriteVenues {
    venues: Venue[]
}

const initialState: FavoriteVenues = {
    venues: []
}

export const FavoriteVenues = createSlice({
    name: "favoriteVenues",
    initialState,
    reducers: {},
    extraReducers(builder)  {
        builder.addCase(addFavoriteVenueAsync.fulfilled, (state, action) => {
            state.venues.push(action.payload)
        })
    }
})

export const addFavoriteVenueAsync = createAsyncThunk("favoriteVenues/addFavoriteVenueAsync",
    async (venue: Venue) => {
        const res = await PostReguest<string>('venues/favorites', venue);
        return venue;
    }
)

export default FavoriteVenues.reducer;