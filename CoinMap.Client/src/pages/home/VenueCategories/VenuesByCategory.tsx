import './VenuesByCategory.css';
import { useEffect, useState } from "react";
import { Venue } from "../../../types/Venue";
import { useDispatch, useSelector } from 'react-redux';
import { ApiDispath, RootState } from "../../../state/store";
import { getVenuesByCategoryAsync } from '../../../state/VenueCategories/VenueCategoriesSlice';
import { resetActiveCategory } from '../../../state/VenueCategories/VenueCategoriesSlice'
import { VenueCategory } from '../../../types/VenueCategory';
import { unwrapResult } from '@reduxjs/toolkit';


const itemsPerPage = 10;

const VenuesByCategory = () => {

    const dispatch = useDispatch<ApiDispath>();
    const activeCategory: VenueCategory | null = useSelector((state: RootState) => state.venueCategories.activeCategory);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentItems, setCurrentItems] = useState<Venue[]>();

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

    return (
        <div className="paginated-container">

            <div className="items-grid">
                {currentItems?.map((item) => (
                <div key={item.id} className="item-card">
                    <p>Latitude: {item.lat} Longutude: {item.lon}</p>
                </div>
                ))}
            </div>

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

        </div>
    )
}

export default VenuesByCategory;