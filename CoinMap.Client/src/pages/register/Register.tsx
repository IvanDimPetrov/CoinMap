import React, { useState } from 'react';
import './Register.css';
import { RegisterUser as RegisterUserForm }  from '../../types/User';
import { useDispatch } from 'react-redux';
import { ApiDispath } from '../../state/store';
import { registerUserAsync } from '../../state/User/UserSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const RegisterUser: React.FC = () => {

    const dispatch = useDispatch<ApiDispath>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegisterUserForm>({
        userName: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('User Registered:', formData);
        dispatch(registerUserAsync(formData))
        .then(unwrapResult)
        .then((result: any) => {
            alert(result.data.message);
            navigate('/login');
        })
        .catch(e => {
            alert(e.message)
        })
        
    };

    return (
        <div className="register-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
            />
            </div>
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
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default RegisterUser;
