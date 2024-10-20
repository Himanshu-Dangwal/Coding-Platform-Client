// components/Problem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Problem = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                let HOST = "https://coding-platform-primary-backend.onrender.com";
                // let HOST = process.env.REACT_APP_HOST;
                const response = await axios.get(`${HOST}/api/problems/${id}`);
                setProblem(response.data);
            } catch (error) {
                console.error('Error fetching problem', error);
            }
        };

        fetchProblem();
    }, [id]);

    // Function to render text with line breaks
    const renderTextWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className="container mt-5">
            {problem ? (
                <>
                    <div className="card shadow-lg p-4 mb-5 bg-white rounded">
                        <h2 className="card-title text-center mb-4">{problem.title}</h2>
                        <div className="card-body">
                            <p className="card-text"><strong>Description:</strong> {renderTextWithLineBreaks(problem.description)}</p>

                            <h5 className="mt-4">Sample Test Cases:</h5>
                            <ul className="list-group list-group-flush">
                                {problem.sampleTestCases.map((tc, index) => (
                                    <li key={index} className="list-group-item">
                                        <strong>Input {index + 1}:<br></br></strong> <code>{renderTextWithLineBreaks(tc.input)}</code>
                                        <br />
                                        <strong>Expected Output {index + 1}:<br></br></strong> <code>{renderTextWithLineBreaks(tc.output)}</code>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to={`/attempt/${id}`} className="btn btn-primary btn-lg">
                            Attempt Problem
                        </Link>
                    </div>
                </>
            ) : (
                <p>Loading problem...</p>
            )}
        </div>
    );
};

export default Problem;
