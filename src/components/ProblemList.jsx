import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/theme.css";

const ProblemList = ({ darkMode, isLoggedIn }) => {
    const [problems, setProblems] = useState([]);
    const [userCompletedProblems, setUserCompletedProblems] = useState([]);

    const { trackName } = useParams();

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserCompletedProblems();
        }
    }, []);

    const fetchUserCompletedProblems = async () => {
        try {
            let HOST = import.meta.env.VITE_HOST;
            const response = await axios.get(`${HOST}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUserCompletedProblems(response.data.problemsCompleted);
            console.log(response.data.problemsCompleted);
        } catch (error) {
            console.error("Error fetching user completed problems:", error);
        }
    };

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                let HOST = import.meta.env.VITE_HOST;
                const url = trackName ? `${HOST}/api/tracks/${trackName}` : `${HOST}/api/problems`;
                const response = await axios.get(url);
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems', error);
            }
        };

        fetchProblems();
    }, [trackName]);

    return (
        <div className={`container mt-4 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ width: "100vw" }}>
            <h1 className="text-center">{trackName ? `Problems for ${trackName.toUpperCase()}` : "All Problems"}</h1>
            <div className="row" style={{ width: "100%" }}>
                {problems.map((problem) => {
                    const isCompleted = isLoggedIn && userCompletedProblems.includes(problem._id);

                    return (
                        <div key={problem._id} className="col-md-6 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        {/* <span className={`status-circle ${isCompleted ? "bg-success" : "bg-warning"}`}></span> */}
                                        <input
                                            type="checkbox"
                                            className="problem-checkbox"
                                            checked={isCompleted}
                                            readOnly
                                        />
                                        <h5 className="card-title mb-2 ms-2">
                                            <Link to={`/problems/${problem._id}`} className={`text-${darkMode ? 'light' : 'dark'}`}>
                                                {problem.title}
                                            </Link>
                                        </h5>
                                    </div>
                                    <Link to={`/attempt/${problem._id}`} className="btn btn-primary">
                                        Solve
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProblemList;
