import { configureStore } from "@reduxjs/toolkit"
import UserReducer from './User/UserSlice'
import VenueReducer from "./VenueCategories/VenueCategoriesSlice";
import FavoriteVenuesReducer from "./FavoriteVenues/FavoriteVenuesSlice";


export const store = configureStore({
    reducer: {
        user: UserReducer,
        venueCategories: VenueReducer,
        favoriteVenues: FavoriteVenuesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type ApiDispath = typeof store.dispatch;