import { Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Home from "./pages/home/Home"
import FavoriteVenues from "./pages/home/FavoriteVenues/FavoriteVenues"

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="favorite-venues" element={<FavoriteVenues/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    )
}

export default Routing;