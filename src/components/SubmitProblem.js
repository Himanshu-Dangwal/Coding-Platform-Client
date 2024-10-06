import React, { useState } from 'react';
import axios from 'axios';

const SubmitProblem = ({ problemId, precode, postcode, testCases }) => {
    const [userCode, setUserCode] = useState('');
    const [submissionResult, setSubmissionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCodeChange = (e) => {
        setUserCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Combine precode, user code, and postcode
        const fullCode = precode + userCode + postcode;

        try {
            const response = await axios.post(`/api/submitProblem`, {
                problemId,
                code: fullCode,
                testCases,
            });

            setSubmissionResult(response.data.result);
        } catch (error) {
            setError('Error in code submission. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Submit Your Solution</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="code">Enter your function code:</label>
                    <textarea
                        id="code"
                        className="form-control"
                        rows="10"
                        value={userCode}
                        onChange={handleCodeChange}
                        placeholder="Write your function code here"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {submissionResult && (
                <div className="alert alert-success mt-3">
                    <h4>Submission Result</h4>
                    <pre>{JSON.stringify(submissionResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default SubmitProblem;
