import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProblemListCompleted from './ProblemListCompleted'; // Import the ProblemList component
import "../styles/ContactMe.css"

const MyProfile = () => {
    const [user, setUser] = useState(null); // Store user profile data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    // Fetch the user profile on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // setError("You haven't logged in yet.");
                setLoading(false);
                return;
            }

            try {
                // Fetch user profile
                // let HOST = process.env.REACT_APP_HOST;
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

    // Display loading state
    if (loading) return <p>Loading...</p>;

    // Display error message if any
    if (error) return <p className="text-danger">{error}</p>;

    // Render the profile information and the list of completed problems
    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    {user ? (
                        <div>
                            <h2 className="text-center mb-4">My Profile</h2>
                            <p className="h5"><strong>Username:</strong> {user.username}</p>
                            <p className="h5"><strong>Email:</strong> {user.email}</p>
                            <h4 className="mt-4">Problems Solved:</h4>
                            {user.problemsCompleted.length === 0 ? (
                                <p>You haven't solved any problems yet.</p>
                            ) : (
                                <ProblemListCompleted problems={user.problemsCompleted} />
                            )}
                        </div>
                    ) : (
                        <p>You haven't logged in yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
