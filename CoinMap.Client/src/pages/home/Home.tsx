import './Home.css'
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import VenueCategories from './VenueCategories/VenueCategories';
import VenuesByCategory from './VenueCategories/VenuesByCategory';

const Home = () => {

    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

    return (
        <>
            {!isSignedIn && <div><h1>You must Login to use the app</h1></div>}
            {isSignedIn && <VenueCategories/>}
            {isSignedIn && <VenuesByCategory/>}
        </>     
    )
}

export default Home;