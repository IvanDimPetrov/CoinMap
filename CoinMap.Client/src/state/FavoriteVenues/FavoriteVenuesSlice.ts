import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Venue } from "../../types/Venue";
import { PostReguest, GetRequest } from "../../api/cruds";

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
        }),
        builder.addCase(getFavoriteVenuesAsync.fulfilled, (state, action) => {
            state.venues = action.payload;
        })
    }
})

export const addFavoriteVenueAsync = createAsyncThunk("favoriteVenues/addFavoriteVenueAsync",
    async (venue: Venue) => {
        await PostReguest<string>('venues/favorites', venue);
        return venue;
    }
)

export const getFavoriteVenuesAsync = createAsyncThunk("favoriteVenues/getFavoriteVenuesAsync",
    async () => {
        const res = await GetRequest<Venue[]>('venues/favorites');
        return res;
    }
)

export default FavoriteVenues.reducer;