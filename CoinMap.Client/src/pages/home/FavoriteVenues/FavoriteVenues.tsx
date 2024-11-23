import { useDispatch, useSelector } from 'react-redux';
import './FavoriteVenues.css';
import { ApiDispath, RootState } from '../../../state/store';
import { useEffect } from 'react';
import { getFavoriteVenuesAsync } from '../../../state/FavoriteVenues/FavoriteVenuesSlice';

const FavoriteVenues = () => {

    const venues = useSelector((state: RootState) => state.favoriteVenues.venues);
    const dispatch = useDispatch<ApiDispath>()
;
    useEffect(()     => {
        dispatch(getFavoriteVenuesAsync())
    }, [])

    

    return  (
        <div className="card-container">
            {venues.map((item) => (
            <div className="card" key={item.id}>
                <div className="card-content">
                <h3 className="card-title">{item.category}</h3>
                <p className="card-description">{item.geolocation_Degrees}</p>
                </div>
            </div>
            ))}
        </div>
    )
}

export default FavoriteVenues;