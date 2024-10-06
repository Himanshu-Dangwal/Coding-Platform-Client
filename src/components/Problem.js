// components/Problem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Problem = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [userCode, setUserCode] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/problems/${id}`);
                setProblem(response.data);
            } catch (error) {
                console.error('Error fetching problem', error);
            }
        };

        fetchProblem();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/submissions/${id}/submit`, { userCode });
            setResult(response.data.submissionResult);
        } catch (error) {
            console.error('Error submitting code', error);
        }
    };

    return (
        <div className="container">
            {problem ? (
                <>
                    <h2>{problem.title}</h2>
                    <p>{problem.description}</p>
                    <pre>{problem.sampleTestCases.map((tc, index) => (
                        <div key={index}>
                            <strong>Input {index + 1}:</strong> {tc.input}
                            <br />
                            <strong>Output {index + 1}:</strong> {tc.output}
                            <br />
                        </div>
                    ))}</pre>

                    <textarea
                        className="form-control"
                        rows="10"
                        placeholder="Write your code here"
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                    />
                    <button className="btn btn-success mt-3" onClick={handleSubmit}>
                        Submit
                    </button>

                    {result && (
                        <div className="alert alert-info mt-3">
                            <strong>Result:</strong> {result.stdout || result.stderr}
                        </div>
                    )}
                </>
            ) : (
                <p>Loading problem...</p>
            )}
        </div>
    );
};

export default Problem;
