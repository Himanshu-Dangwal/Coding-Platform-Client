import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProblemList from './ProblemList'; // Import the ProblemList component

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [completedProblems, setCompletedProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You haven\'t logged in yet.');
                setLoading(false);
                return;
            }

            try {
                // Fetch user profile
                const profileResponse = await axios.get('https://coding-platform-primary-backend.onrender.com/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(profileResponse.data);

                // Fetch completed problems
                const problemsResponse = await axios.get('https://coding-platform-primary-backend.onrender.com/api/user/profile/problemsCompleted', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCompletedProblems(problemsResponse.data); // Assuming response contains the list of completed problems
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container my-5">
            {user ? (
                <div>
                    <h2 className="text-center mb-4">My Profile</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <h3>Problems Solved:</h3>
                    {completedProblems.length === 0 ? (
                        <p>You haven't solved any problems yet.</p>
                    ) : (
                        <ProblemList problems={completedProblems} />
                    )}
                </div>
            ) : (
                <p>You haven't logged in yet.</p>
            )}
        </div>
    );
};

export default MyProfile;
