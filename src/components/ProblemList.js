// components/ProblemList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/problems');
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems', error);
            }
        };

        fetchProblems();
    }, []);

    return (
        <div className="container">
            <h2>Problems</h2>
            <ul className="list-group">
                {problems.map((problem) => (
                    <li key={problem._id} className="list-group-item">
                        <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProblemList;
