import React, { useState } from 'react';
import './Login.css';
import { LoginUser } from '../../types/User';
import { useDispatch } from 'react-redux';
import { loginUserAsync } from '../../state/User/UserSlice';
import { ApiDispath } from '../../state/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {

    const dispatch = useDispatch<ApiDispath>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginUser>({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('User Logged In:', formData);
        dispatch(loginUserAsync(formData))
        .then(unwrapResult)
        .then((result) => {
            alert("Successfull login!!!");
            sessionStorage.token = result.token;
            navigate("/");
        })
        .catch(() => {
            alert("Unsuccessfull login!!!");
        })
    };

    return (
        <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
            />
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
