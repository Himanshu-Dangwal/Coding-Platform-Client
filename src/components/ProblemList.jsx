import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);

    // Fetching problems from the backend API
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                // let HOST = process.env.REACT_APP_HOST || "http://localhost:8080";
                // console.log(HOST);
                let HOST = import.meta.env.VITE_HOST;
                const response = await axios.get(`${HOST}/api/problems`);
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems', error);
            }
        };

        fetchProblems();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Problems Here</h2>
            <div className="row">
                {problems.map((problem) => (
                    <div key={problem._id} className="col-md-6 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                {/* Problem Title */}
                                <div>
                                    <h5 className="card-title mb-2">
                                        <Link to={`/problems/${problem._id}`} className="text-decoration-none">
                                            {problem.title}
                                        </Link>
                                    </h5>
                                    {/* Problem description or any short detail */}
                                    {/* <p className="card-text">
                                        {problem.description || 'Problem description goes here...'}
                                    </p> */}
                                </div>
                                {/* Solve button */}
                                <Link to={`/attempt/${problem._id}`} className="btn btn-primary">
                                    Solve
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemList;
