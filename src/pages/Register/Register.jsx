/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCloseForm = () => {
        navigate('/login');
    };

    const isRegisterPage = location.pathname === '/register';

    return (
        <>
            {isRegisterPage && (
                <div className="register-popup">
                    <div className="register-form">
                        <button className="close-btn" onClick={handleCloseForm}>
                            X
                        </button>
                        <h3>Register Form</h3>
                        <form>
                            <div className="form-sub-w3ls">
                                <input
                                    placeholder="User Name"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="form-sub-w3ls">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="form-sub-w3ls">
                                <input
                                    placeholder="Password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="form-sub-w3ls">
                                <input
                                    placeholder="Confirm Password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="login-check">
                                <label className="checkbox">
                                    <input type="checkbox" defaultChecked />
                                    I Accept Terms & Conditions
                                </label>
                            </div>
                            <div className="submit-w3l">
                                <input
                                    type="submit"
                                    value="Register"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterPage;
