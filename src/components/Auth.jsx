import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ isLogin, setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Added for error handling
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Payload for API request (login or registration)
            const payload = isLogin
                ? { email, password }
                : { username, email, password };

            // API call for login or registration
            let HOST = "https://coding-platform-primary-backend.onrender.com";
            const response = await axios.post(
                `${HOST}/api/user/${isLogin ? 'login' : 'register'}`,
                payload
            );

            if (response.data.success) {
                console.log(response.data);
                if (isLogin) {
                    // Storing the token from response
                    localStorage.setItem('token', response.data.authToken);

                    // Update the isLoggedIn state to true after login
                    setIsLoggedIn(true);

                    // Notify user of successful login and redirect
                    alert('Login Successful');
                    navigate('/problems');
                } else {
                    // Notify user of successful registration and redirect to login
                    alert('Registration Successful');
                    navigate('/login');
                }
            } else {
                // If the response doesn't indicate success, handle it
                setErrorMessage(response.data.message || 'Authentication failed');
            }
        } catch (error) {
            // Handling any API or network error
            const errMessage = error.response?.data?.message || 'Error during authentication';
            setErrorMessage(errMessage);
            console.error('Error:', errMessage);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display errors */}

                <form onSubmit={handleSubmit}>
                    {/* Username input (only show if registering) */}
                    {!isLogin && (
                        <div className="form-group mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    )}

                    {/* Email input */}
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password input */}
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary w-100">
                        {isLogin ? 'Login' : 'Register'}
                    </button>

                    {/* Link to toggle between login/register */}
                    <div className="text-center mt-3">
                        {isLogin ? (
                            <p>
                                Don't have an account? <a href="/register">Register here</a>
                            </p>
                        ) : (
                            <p>
                                Already have an account? <a href="/login">Login here</a>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
