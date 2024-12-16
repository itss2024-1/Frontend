// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/style.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div>
            <h1>EXISTING LOGIN FORM</h1>
            <div className="w3layoutscontaineragileits">
                <h2>Login here</h2>
                <form action="#" method="post">
                    <input
                        type="email"
                        name="Username"
                        placeholder="EMAIL"
                        required
                    />
                    <input
                        type="password"
                        name="Password"
                        placeholder="PASSWORD"
                        required
                    />
                    <ul className="agileinfotickwthree">
                        <li>
                            <input
                                type="checkbox"
                                id="brand1"
                                value=""
                            />
                            <label htmlFor="brand1">
                                <span></span>Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </li>
                    </ul>
                    <div className="aitssendbuttonw3ls">
                        <input type="submit" value="LOGIN" />
                        <p>
                            To register new account <span>→</span>{' '}
                            <a
                                className="w3_play_icon1"
                                onClick={handleRegisterRedirect}
                            >
                                Click Here
                            </a>
                        </p>
                        <div className="clear"></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
