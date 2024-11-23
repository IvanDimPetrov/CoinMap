import './VenuesByCategory.css';
import { useEffect, useState } from "react";
import { Venue } from "../../../types/Venue";
import { useDispatch, useSelector } from 'react-redux';
import { ApiDispath, RootState } from "../../../state/store";
import { getVenuesByCategoryAsync } from '../../../state/VenueCategories/VenueCategoriesSlice';
import { resetActiveCategory } from '../../../state/VenueCategories/VenueCategoriesSlice'
import { VenueCategory } from '../../../types/VenueCategory';
import { unwrapResult } from '@reduxjs/toolkit';
import { addFavoriteVenueAsync } from '../../../state/FavoriteVenues/FavoriteVenuesSlice';


const itemsPerPage = 10;

const VenuesByCategory = () => {

    const dispatch = useDispatch<ApiDispath>();
    const activeCategory: VenueCategory | null = useSelector((state: RootState) => state.venueCategories.activeCategory);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentItems, setCurrentItems] = useState<Venue[]>([]);

    const totalPages = activeCategory ? Math.ceil(activeCategory.venuesCount / itemsPerPage) : 0;

    const getCurentVenues = (page: number) => {
        dispatch(getVenuesByCategoryAsync({
            category: activeCategory?.name,
            page: page,
            pageSize: itemsPerPage
        }))
        .then(unwrapResult)
        .then(result => {
            setCurrentItems(result)
        })
    }

    useEffect(() => {
        dispatch(resetActiveCategory());
    }, []) 

    useEffect(() => {
        if(activeCategory) {
            setCurrentPage(1);
            getCurentVenues(1);
        }
        else {
            dispatch(resetActiveCategory());
            setCurrentItems([]);
        }
    }, [activeCategory])

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            getCurentVenues(page)
        }
    };

    const addFavoriteVenue = (venue: Venue) => {
        dispatch(addFavoriteVenueAsync(venue))
    }

    const pagination: JSX.Element | null = currentItems?.length > 0 ? (
            <div className="pagination">
                    <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    >
                    Previous
                    </button>
                    <span>
                    Page {currentPage} of {totalPages}
                    </span>
                    <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    >
                    Next
                    </button>
                </div>
    ) : null;

    return (
        <div className="paginated-container">

            {pagination}

            <div className="items-grid">
                {currentItems?.map((item) => (
                <div key={item.id} className="item-card">
                    <p>
                        <strong>Geolocation Degrees:</strong> {item.geolocation_Degrees}  
                        <span style={{padding: "2px", cursor: "pointer", backgroundColor: "lightgray"}} onClick={() => navigator.clipboard.writeText(item.geolocation_Degrees)}>📄</span>
                        <button onClick={() => addFavoriteVenue(item)}>Add to favorites</button>
                    </p>
                </div>
                ))}
            </div>

            {pagination}

        </div>
    )
}

export default VenuesByCategory;