import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { ApiDispath, RootState } from "../../state/store";
import { logout } from '../../state/User/UserSlice';

const Header: React.FC = () => {

  const user = useSelector((state: RootState) => state.user.user);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const dispatch = useDispatch<ApiDispath>();

  const logoutUser = () => {
    dispatch(logout());
    sessionStorage.removeItem("token");
  }

  return (
    <header className="header">
      <Link to="/" className="header-logo">CoinMap</Link>
      <nav className="header-nav">
        {isSignedIn && <span>Welcome {user.userName}</span>}
        {!isSignedIn && <Link to="/register" className="header-link header-link-login">Register</Link>}
        {!isSignedIn && <Link to="/login" className="header-link header-link-login">Login</Link>}
        {isSignedIn && <Link to="/favorite-venues" className="header-link header-link-login">Favorite Venues</Link>}
        {isSignedIn && <button className="header-link-login" onClick={logoutUser}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
