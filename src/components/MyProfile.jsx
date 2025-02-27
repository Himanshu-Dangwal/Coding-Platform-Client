import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProblemListCompleted from './ProblemListCompleted'; // Import the ProblemList component
import "../styles/ContactMe.css";
import profilePicture from "../images/profileEmoji.png"

const MyProfile = ({ darkMode }) => {
    const [user, setUser] = useState(null); // Store user profile data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                let HOST = import.meta.env.VITE_HOST;

                const profileResponse = await axios.get(`${HOST}/api/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(profileResponse.data); // Set the user with profile data including problemsCompleted
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <div className={`text-center ${darkMode ? 'text-light' : 'text-dark'}`}><p>Loading...</p></div>;

    if (error) return <div className={`text-center text-danger ${darkMode ? 'text-light' : 'text-dark'}`}><p>{error}</p></div>;

    return (
        <div className={`container my-5 px-4 py-5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div className="card shadow-lg border-0">
                <div className="card-body">
                    {user ? (
                        <div>
                            <div className="row mb-4 d-flex justify-content-center align-items-center">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img
                                        src={profilePicture || 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        className="rounded-circle img-fluid"
                                        style={{ maxWidth: '150px', height: '150px' }}
                                    />
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <h2 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>{user.username}'s Profile</h2>
                                </div>
                            </div>
                            <div className="col-12 c-flex justify-content-center align-items-center text-center">
                                <p className={`h5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}><strong>Email:</strong> {user.email}</p>
                                <h4 className={`mt-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>Problems Solved:</h4>
                                {user.problemsCompleted.length === 0 ? (
                                    <p className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>You haven't solved any problems yet.</p>
                                ) : (
                                    <ProblemListCompleted problems={user.problemsCompleted} darkMode={darkMode} />
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className={`text-center ${darkMode ? 'text-light' : 'text-dark'}`}>You haven't logged in yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

