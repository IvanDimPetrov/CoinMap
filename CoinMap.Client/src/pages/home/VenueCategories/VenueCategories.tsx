import './VenueCategories.css';
import { useDispatch, useSelector } from "react-redux";
import VenueCategoriesDropDown from "./VenueCategoriesDropDown"
import { ApiDispath, RootState } from "../../../state/store";
import { getVenueCategoriesAsync } from '../../../state/VenueCategories/VenueCategoriesSlice';
import { useEffect } from "react";

const VenueCategories = () => {
    
    const dispatch = useDispatch<ApiDispath>();
    const venueCategories = useSelector((state: RootState) => state.venueCategories.categories);

    useEffect(() => {
        if (venueCategories.length == 0) {
            dispatch(getVenueCategoriesAsync());
        }
    }, [])

    return (
        <div className="categories-container">
            <VenueCategoriesDropDown categories={venueCategories} onCategorySelect={() => {}}/>
            <div className="categories-list">
                {venueCategories.length > 0 ? (
                <ul>
                    {venueCategories.map((item) => (
                    <li key={item.id}>Category: '<strong>{item.name}</strong>' has {item.venuesCount} venues</li>
                    ))}
                </ul>
                ) : (
                <p>Please select a category to see items.</p>
                )}
             </div>
        </div>
    )
}

export default VenueCategories;